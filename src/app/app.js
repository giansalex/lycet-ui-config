(function () {
    'use strict';

    angular.module('app', [
        // Angular modules 

        // Custom modules 

        // 3rd Party Modules
    ])
    .constant("ApiConfig", { endpoint: 'http://localhost:8080' })
    .component('factApp', {
        templateUrl: '/app/app.html',
        controller: function () {}
    });
})();