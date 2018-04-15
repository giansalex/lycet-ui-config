var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var modRewrite = require('connect-modrewrite');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var filter = require('gulp-filter');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var htmlmin = require('gulp-htmlmin');
var insertLines = require('gulp-insert-lines');
var ngHtml2Js = require("gulp-ng-html2js");
var concat = require('gulp-concat');
var minimist = require('minimist');
var buildOptions = require('minimist-options');
var zip = require('gulp-zip');
var replace = require('gulp-replace');

var options = buildOptions({
    out: {
        type: 'string',
        default: 'dist'
    },
    url: {
        type: 'string',
        default: ''
    },
    zip: {
        type: 'string',
        default: './'
    }
});

var options = minimist(process.argv.slice(2), options);

var ngTemplatejs = 'templateCachePartials.js';
var bases = {
 src: 'src',
 dist: options.out,
 endpoint: options.url,
 zipDestino: options.zip
};

gulp.task('clean:dist',
    function() {
        return del.sync(bases.dist);
    });

gulp.task('browserSync',
    function() {
        browserSync.init({
            server: {
                baseDir: bases.src,
                middleware: [
                    modRewrite([
                        '!\\.\\w+$ /index.html [L]'
                    ])
                ]
            }
        });
    });

gulp.task('useref', function(){
  var indexHtmlFilter = filter(['**/*', '!**/index.html'], { restore: true });

    return gulp.src(bases.src + '/*.html')
        .pipe(insertLines({
            'after': /<script src="\/app\/app.js"><\/script>$/,
            'lineAfter': '<script src="/../' +
                bases.dist +
                '/app-config.prod.js"></script>\n' +
                '<script src="/../' +
                bases.dist +
                '/tmp/' +
                ngTemplatejs +
                '"></script>\n'
        }))
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(indexHtmlFilter)
        .pipe(rev()) // Rename the concatenated files (but not index.html)
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest(bases.dist));
});

gulp.task('favicon', function() {
    return gulp
        .src(bases.src + '/favicon.ico')
        .pipe(gulp.dest(bases.dist));
});

// copia los html template a dist 
gulp.task('html', function () {
  return gulp
    .src(bases.src + '/app/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(bases.dist + '/app'));
});

// change endpoint to release
gulp.task('endpoint', function() {
    return gulp
        .src(bases.src + '/app/app-config.prod.js')
        .pipe(replace('%endpoint%', bases.endpoint))
        .pipe(gulp.dest(bases.dist));
});

// Create cache template in un solo archivo.
gulp.task('templates',
    function() {
        return gulp
            .src(bases.src + "/app/**/*.html")
            .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true }))
            .pipe(ngHtml2Js({
                moduleName: "appPartials",
                prefix: "/app/"
            }))
            .pipe(concat(ngTemplatejs))
            .pipe(gulp.dest(bases.dist + '/tmp'));
    });

gulp.task('clean:unused', function() {
    return del([bases.dist + '/tmp', bases.dist + '/app-config.prod.js']);
});

gulp.task('fonts',
    function() {
        return gulp.src(bases.src + '/assets/fonts/**/*')
            .pipe(gulp.dest(bases.dist + '/fonts'));
    });

gulp.task('watch',
    ['browserSync'],
    function() {
        gulp.watch([bases.src + '/index.html', bases.src + '/app/**/*.html'], browserSync.reload);
        gulp.watch(bases.src + '/app/**/*.js', browserSync.reload);
    });

gulp.task('zip', () =>
    gulp.src(bases.dist + '/**/*')
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest(bases.zipDestino))
);

gulp.task('build',
    function(callback) {
        runSequence('clean:dist',
            ['templates', 'endpoint'],
            ['useref', 'fonts', 'favicon'],
            'clean:unused',
            'zip',
            'clean:dist',
            callback
        );
    });

gulp.task('default',
    function(callback) {
        runSequence(['browserSync', 'watch'],
            callback
        );
    });