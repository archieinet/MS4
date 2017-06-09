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
                },
            })

            ;//$stateProvider


    };

    var runState = function ($rootScope, $state, srv) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                var reQ = toState.data.reqLogin;

                if (sessionStorage.profile !== undefined)
                    $rootScope.Profile = JSON.parse(sessionStorage.profile);

                if (reQ && $rootScope.Profile === undefined) {
                    event.preventDefault();
                    srv().then(function (resp) {
                        $rootScope.Profile = resp;
                        return $state.go(toState, toParams);
                    }).catch(function () {
                        return $state.go('home');
                    });
                }
            });


        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            //console.info('$stateChangeSucces....');

        });

    }; //runState

    app
        .config(['$stateProvider', '$urlRouterProvider', configRoute]) //config
        .run(['$rootScope', '$state',  'authService', runState])
        .constant('appConst', {
            API: 'http://localhost:65438/',
        });//app






})();