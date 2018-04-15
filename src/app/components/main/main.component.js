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
        mainController.$inject = ['$scope'];

    function mainController($scope) {
    }
})();