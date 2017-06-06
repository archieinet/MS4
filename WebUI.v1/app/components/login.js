(function () {
    'use strict';



    var controller = function (srv) {
        var login = this;
        
        login.$onInit = function () {
            login.name = 'archie';
           // console.info('login......' + JSON.stringify($rootScope.Profile));
        };

        login.ok = function () {
            var x = srv.fetch('/api/authen/', {
                UserName: login.usr,
                Email: login.usr,
                Password: login.pwd
            });

            login.close({ $value: 'submit' });
        };//ok

        login.cancel = function () {
            login.dismiss({ $value: 'cancel' });
        };// cancel


        //-----------test
        login.testFunc = function () {
            return 10;
        };
    }; //controller


    controller.$inject = ['services']

    app.component('loginComponent', {
            templateUrl: 'app/views/login.html',
            controller: controller ,
            controllerAs: 'login',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            }
        });

})();
