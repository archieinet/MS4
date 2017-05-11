(function () {
    'use strict';

    var controller = function ($rootScope) {
        var login = this;




        login.$onInit = function () {
            console.info('login......' + JSON.stringify($rootScope.Profile));
        };





    }; //controller







    app.component('loginComponent', {
            templateUrl: 'app/views/login.html',
            controller: ['$rootScope', controller],
            controllerAs: 'login'

        });

})();
