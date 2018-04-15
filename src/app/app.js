(function () {
    'use strict';

    angular.module('app', [
        // Angular modules 

        // Custom modules 

        // 3rd Party Modules
        'naif.base64',
    ])
    .constant("ApiConfig", { endpoint: 'http://localhost:8080' })
    .component('factApp', {
        templateUrl: '/app/app.html',
        controller: function () {}
    });
})();