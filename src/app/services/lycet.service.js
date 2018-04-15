(function () {
    'use strict';

    angular
        .module('app')
        .factory('lycetService', lycetService);

    lycetService.$inject = ['$http', 'ApiConfig'];

    function lycetService($http, $apiConfig) {
        var service = {
            save : saveConfig
        };

        return service;

        function saveConfig(token, config) {
            return $http.post($apiConfig.endpoint + '?token=' + token, config);
        }
    }
})();