(function () {
    'use strict';

   


    var controller = function ($http, CONST) {
        var login = this;
        
        login.$onInit = function () {
            login.name = 'archie';
           // console.info('login......' + JSON.stringify($rootScope.Profile));
        };

        login.ok = function () {
            $http.get(CONST.API + '/api/authen/', {
                params: {
                    UserName: login.usr,
                    Email: login.usr,
                    Password: login.pwd
                },
                'Developer': 'AP',
                'Version': '1.0.0',
                'Content-Type': 'application/json'
            })
                .then(function (resp) {
                    login.close({
                        $value: {
                            name: login.usr,
                            xkey: resp.data
                        }
                    });
                }).catch(function (resp) {
                    toastr.error(resp.statusText, 'ERROR');
                    return resp.statusText;
                });
        };//ok

        login.cancel = function () {
            login.dismiss({ $value: 'cancel' });
        };// cancel


        //-----------test
        login.testFunc = function () {
            return 10;
        };
    }; //controller


    controller.$inject = ['$http', 'appConst'];

    app.component('loginComponent', {
        templateUrl: 'app/views/login.html',
        controller: controller,
        controllerAs: 'login',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });

})();
