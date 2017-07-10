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
                    reqLogin: false
                },
            })
            .state('logout', {
                url: '/home',
                data: {
                    reqLogin: false
                }
            })

            ;//$stateProvider


    };

    var runState = function ($rootScope, $state, srv) {
        var $login = $('#dashboardBtn');

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
            

            if (toState.name === 'logout')
                if (!!sessionStorage.getItem('profile')) {
                    sessionStorage.removeItem('profile');
                    delete $rootScope.Profile;
                    $login.show();
                }

            if ($rootScope.Profile !== undefined)
                if ($login[0].style.display !== 'none')  
                    $login.hide(1000);
                 
        });

    }; //runState

    app
        .config(['$stateProvider', '$urlRouterProvider', configRoute]) //config
        .run(['$rootScope', '$state',  'authService', runState])
        .constant('appConst', {
            API: 'http://localhost:65438/',
        });//app






})();