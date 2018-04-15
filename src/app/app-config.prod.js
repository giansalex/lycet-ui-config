(function () {
    'use strict';
    angular.module('app')
        .config(['$compileProvider', '$provide', function($compileProvider, $provide) {
            $provide.constant('ApiConfig', { endpoint : '%endpoint%'});
            $compileProvider.debugInfoEnabled(false);
            $compileProvider.commentDirectivesEnabled(false);
            $compileProvider.cssClassDirectivesEnabled(false);
        }])
        .requires.push('appPartials');
})();