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
        mainController.$inject = ['$scope', 'lycetService', 'storeService', 'ApiConfig', '$window'];

    function mainController($scope, $service, $store, $apiConfig, $window) {
        $scope.sending = false;
        $scope.config = {};
        $scope.save = saveConfig;
        $scope.openLycet = openLycet;

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
            var frmConfig = $scope.frmConfig;
            if (frmConfig.$invalid || frmConfig.$pristine) {
                return;
            }

            var config = $scope.config;
            var data = {
                logo: config.logoContent.base64,
                certificate: config.certContent.base64
            };
            saveSett(config);
            sendConfig(config.token, data);
        }

        function sendConfig(token, data) {
            $scope.sending = true;

            $service.save(token, data)
            .then(function () {
                swal("Guardado!", 'El configuración ha sido guardada', "success");
            }, function (err) {
                console.log(err);
                swal("Error!", "No se pudo guardar", "error");
            })
            .then(function () {
                $scope.sending = false;
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

        function openLycet() {
            $window.open('https://github.com/giansalex/lycet', '_blank');
        }
    }
})();