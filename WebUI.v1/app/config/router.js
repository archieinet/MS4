(function(){

    'use strict';


    var configRoute = function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                template: '<h1>Welcome HOME</h1>',
                data: {
                    reqLogin: false
                }
            }) //home
            .state('login', {
                url: '/login',
                template: '<login-component></login-component>',
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
                    template: '<login-component></login-component>',
                    size:'lg'
                });





                //$rootScope.Profile = {
                //    name: 'archie',
                //    xkey: 'SKDJF-SDAKFIX-2342-SDFK-DFJSAK'
                //};
            }
            

        });


        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            console.log(toState);

        });

    }; //runState

    app
        .config(['$stateProvider', '$urlRouterProvider', configRoute]) //config
        .run(['$rootScope', '$state', '$uibModal', 'services', runState])
        .constant('appConst', {
            API: 'http://localhost:65438/',
        });//app






})();