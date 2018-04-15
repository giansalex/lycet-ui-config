(function () {
    'use strict';

    angular
        .module('app')
        .factory('storeService', storeService);

    storeService.$inject = ['$window'];

    function storeService($window) {
        var key = 'LYCET_SETTINGS';
        var service = {
            getSettings: getSettings,
            saveSettings: saveSettings
        };

        return service;

        function getSettings() {
            var json = $window.localStorage.getItem(key);
            if (!json) {
                return null;
            }

            return JSON.parse(json);
        }

        function saveSettings(config) {
            $window.localStorage.setItem(key, JSON.stringify(config));
        }
    }
})();