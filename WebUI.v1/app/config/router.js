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
                //component: 'dashboardComponent',
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
                    size:'md'
                }).result.then(function (resp) {
                    console.log('submitted ' + resp);
                    }, function (resp) {
                        $state.go(fromState.name || 'home');
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