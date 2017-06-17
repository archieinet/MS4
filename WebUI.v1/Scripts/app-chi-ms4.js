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
(function () {
    'use strict';

    var authServiceAPI = function ($uibModal) {
        function userAuthenticated(resp) {
            if (sessionStorage.profile !== undefined)
                sessionStorage.removeItem('profile');
            sessionStorage.setItem('profile', JSON.stringify(resp));

            return resp;
        };

        return function () {
            return $uibModal.open({
                animation: true,
                component: 'loginComponent',
                size: 'md',
            }).result.then(userAuthenticated);
        };

    }; //authServiceAPI

    authServiceAPI.$inject = ['$uibModal'];

    app.service('authService', authServiceAPI);

})();
(function () {

    'use strict';

    app.directive('fileModel', function () {

        return {
            scope: {
                selectedFile: '='
            },
            link: function (scope, el, attrs) {
                el.on('change', function (event) {
                    var files = event.target.files;
                    for (var i = 0; i < files.length; i++) {
                        console.info('file selected: ' + files[i].name);
                        scope.$emit('selectedFile', { file: files[i] });
                    }
                });
            }
        };
    });


})();
(function () {
    'use strict';

   


    var controller = function ($http, CONST, $timeout) {
        var login = this;
        login.inProc = false;
        login.fail = false;
        
        login.$onInit = function () {
            login.name = 'archie';
           // console.info('login......' + JSON.stringify($rootScope.Profile));
        };

        login.ok = function () {
            login.inProc = true;
            $timeout(function () { 
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
                    login.fail = true;
                    return resp.statusText;
                }).finally(function () {
                    login.inProc = false;
                    });
            }, 2000);
        };//ok

        login.cancel = function () {
            login.dismiss({ $value: 'cancel' });
        };// cancel


        //-----------test
        login.testFunc = function () {
            return 10;
        };
    }; //controller


    controller.$inject = ['$http', 'appConst', '$timeout'];

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

(function () {
    'use strict';

    var dashCtrl = function ($rootScope, $scope, $timeout) {
        var dash = this;
        $scope.files = [];

        dash.inProc = false;
                

        $scope.$on('selectedFile', function (event, args) {
            $scope.$apply(function () {
                    $scope.files.push(args.file);
            });//apply
        }); //$on
        
        
        dash.removeAttach = function (idx) {
            $scope.files.splice(idx, 1);
        } //dash.removeAttach


        dash.uploadFiles = function () {
            dash.inProc = true;
            if ($scope.files.length === 0) {
                alert('No files to be upload');
                return false;
            }

            //----upload here
            $timeout(function () {
                dash.inProc = false;
            }, 2000);

        }; //dash.uploadFiles();


        dash.removeAll = function () {
            if ($scope.files.length===0)  
                return false;

            $scope.files = [];
            
        };


        dash.profile = JSON.stringify($rootScope.Profile);

       

    }; //dashCtrl

    

    dashCtrl.$inject = ['$rootScope', '$scope', '$timeout'];

    app.component('dashboardComponent', {
        templateUrl: 'app/views/dashboard.html',
        controller: dashCtrl,
        controllerAs: 'dash', 
      
    });

})();
(function () {
    'use strict';

    var controller = function ($http, $timeout) {
        var df = this;
        df.files = [];

        df.$onInit = function () {
            $timeout(function () {
                console.info('.....timeout...');
                $http.get('Temp_Data/ds1.json')
                    .then(function (data) {
                        df.files = data.data;
                        return true;
                    });
            }, 5000);
        };

    };
       

    controller.$inject = ['$http', '$timeout'];

    app.component('displayFilesComponent', {
        templateUrl: 'app/views/display-files.html',
        controller: controller,
        controllerAs: 'df',
        transclude: true

    });



})();