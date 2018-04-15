(function () {
    'use strict';

    angular
        .module('app')
        .factory('storeService', storeService);

    storeService.$inject = ['$window', 'ApiConfig'];

    function storeService($window, $apiConfig) {
        var key = 'LYCET_CONFIG';
        var service = {
            getEndpoint: getEndpoint,
            saveEndpoint: saveEndpoint
        };

        return service;

        function getEndpoint() {
            var url = $window.localStorage.getItem(key);
            $apiConfig.endpoint = url;

            return url;
        }

        function saveEndpoint(url) {
            $apiConfig.endpoint = url;
            $window.localStorage.setItem(key, url);
        }
    }
})();