(function () {
    'use strict';

    var controller = function ($rootScope) {
        var login = this;
        
        login.$onInit = function () {
            login.name = 'archie';
            console.info('login......' + JSON.stringify($rootScope.Profile));
        };

        login.ok = function () {
            login.close({ $value: 'submit' });
        };//ok

        login.cancel = function () {
            login.dismiss({ $value: 'cancel' });
        };// cancel

    }; //controller

    app.component('loginComponent', {
            templateUrl: 'app/views/login.html',
            controller: ['$rootScope', controller],
            controllerAs: 'login',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            }
        });

})();
