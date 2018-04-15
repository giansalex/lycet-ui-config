(function () {
    'use strict';

    angular
        .module('app')
        .component('lycetMenu',
        {
            templateUrl : '/app/components/menu/menu.component.html',
            controller: lycetMenuController,
            controllerAs: 'menu',
            bindings : {
                title : '<'
            }
        });
    lycetMenuController.$inject = [];

    function lycetMenuController() {
    }
})();