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
        mainController.$inject = ['$scope', 'lycetService', 'storeService', 'ApiConfig'];

    function mainController($scope, $service, $store, $apiConfig) {
        $scope.config = {};
        $scope.save = saveConfig;

        activate();

        function activate() {
            var sett = $store.getSettings();
            if (!sett) {
                return;
            }

            $scope.config.endpoint = sett.endpoint;
            $scope.config.token = sett.token;
        }
        
        function saveConfig() {
            var config = $scope.config;
            var data = {
                logo: config.logoContent.base64,
                certificate: config.certContent.base64
            };
            saveSett(config);
            $service.save(config.token, data)
            .then(function () {
                swal("Guardado!", 'El configuración ha sido guardada', "success");
            }, function (err) {
                console.log(err);
                swal("Error!", "No se pudo guardar", "error");
            });
        }

        function saveSett(config) {
            var sett = {
                endpoint: config.endpoint,
                token: config.token
            };
            $apiConfig.endpoint = sett.endpoint;
            $store.saveSettings(sett);
        }
    }
})();