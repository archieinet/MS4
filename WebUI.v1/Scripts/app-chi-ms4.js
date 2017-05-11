var app = angular.module('appMS4', [
    'ui.router',
    'ui.bootstrap'
]);




(function(){

    'use strict';


    var configRoute = function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/views/main.html',
                data: {
                    reqLogin: false
                }
            }) //home
            .state('dashboard', {
                url: '/dashboard',
                template: '<dashboard-component></dashboard-component>',
                data: {
                    reqLogin: true
                }
            
            })

            ;//$stateProvider


    };

    var runState = function ($rootScope, $state, $uibModal, srv) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var reQ = toState.data.reqLogin;
            

            if (reQ && $rootScope.Profile === undefined) {
                $uibModal.open({
                    animation: true,
                    component: 'loginComponent',
                    size:'sm'
                }).result.then(function (resp) {
                    console.log('submitted ' + resp);
                    }, function (resp) {
                        $state.go('home');
                    });

                



                //$rootScope.Profile = {
                //    name: 'archie',
                //    xkey: 'SKDJF-SDAKFIX-2342-SDFK-DFJSAK'
                //};
            }
            

        });


        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            console.info('$stateChangeSucces....');

        });

    }; //runState

    app
        .config(['$stateProvider', '$urlRouterProvider', configRoute]) //config
        .run(['$rootScope', '$state', '$uibModal', 'services', runState])
        .constant('appConst', {
            API: 'http://localhost:65438/',
        });//app






})();
(function(){
    'use strict';

    var services = function ($http, $q, CONST) {
        //API

    }; // services
    app.service('services', ['$http', '$q', 'appConst', services]);

})();
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

(function () {


    var dashCtrl = function ($rootScope) {
        var dash = this;



    }; //dashCtrl

    app.component('dashboardComponent', {
        templateUrl: 'app/views/dashboard.html',
        controller: ['$rootScope', dashCtrl],
        controllerAs: 'dash'

    });

})();