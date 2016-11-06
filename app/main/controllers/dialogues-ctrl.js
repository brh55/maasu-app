'use strict';
angular.module('main')
.controller('DialoguesCtrl', function () {
    var vm = this;
    vm.accept = false;

    vm.acceptTerms = function () {
        vm.accept = true;
    };

    
});
