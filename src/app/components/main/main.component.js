(function () {
    'use strict';

    angular
        .module('app')
        .component('lycetMain',
        {
            templateUrl : '/app/components/main/main.component.html',
            controller: mainController,
            controllerAs: 'main'
        });
        mainController.$inject = ['$scope', 'lycetService', 'storeService'];

    function mainController($scope, $service, $store) {
        $scope.config = {};
        $scope.save = saveConfig;

        activate();

        function activate() {
            $scope.config.endpoint = $store.getEndpoint();
        }
        
        function saveConfig() {
            var config = $scope.config;
            saveEndpoint(config.endpoint);
            var data = {
                logo: config.logoContent.base64,
                certificate: config.certContent.base64
            };

            console.log(data);
        }

        function saveEndpoint(url) {
            $store.saveEndpoint(url);
        }
    }
})();