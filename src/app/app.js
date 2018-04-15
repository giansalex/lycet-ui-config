(function () {
    'use strict';

    angular.module('app', [
        // Angular modules 

        // Custom modules 

        // 3rd Party Modules
        'naif.base64',
    ])
    .constant("ApiConfig", { endpoint: 'http://localhost:8080' })
    .component('lycetApp', {
        templateUrl: '/app/app.html',
        controllerAs: 'vm',
        controller: function () {
            this.title = 'Lycet';
        }
    });
})();