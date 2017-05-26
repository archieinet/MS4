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

                $rootScope.Profile = {
                    name: 'archie',
                    xkey: 'SKDJF-SDAKFIX-2342-SDFK-DFJSAK'
                };
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
(function () {
    'use strict';

    var services = function ($http, $q, CONST) {
        //API
        var GET = function (u) {
            $http.get(CONST.API + u, {
                'Developer': 'AP',
                'Version': '1.0.0'
            })
                .then(succResp)
                .catch(erroResp);
        };

        var POST = function (u, d) {
            $http.post(CONST.API + u, d)
                .then(succResp)
                .catch(erroResp);
        };

        var PUT = function (u, d) {
            $http.post(CONST.API + u, d)
                .then(succResp)
                .catch(erroResp);
        };

        function succResp(resp) { return resp.data;};
        function erroResp(resp) { return $q.reject('ERROR status: ' + resp.status); };

        

        return {
            fetch: GET,
            add: POST,
            update: PUT
        };




    }; // services
    app.service('services', ['$http', '$q', 'appConst', services]);

})();
(function () {

    'use strict';

    app.directive('fileModel', function () {

        return {
            scope: true,
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


        //-----------test
        login.testFunc = function () {
            return 10;
        };
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



   

    var dashCtrl = function ($rootScope, $scope) {
        var dash = this;
        $scope.files = [];

        $scope.$on('selectedFile', function (event, args) {
            $scope.$apply(function () {
                    $scope.files.push(args.file);
            });//apply
        }); //$on
        
        
        dash.removeAttach = function (idx) {
            $scope.files.splice(idx, 1);
        } //dash.removeAttach


        dash.uploadFiles = function () {
            if ($scope.files.length === 0) {
                alert('No files to be upload');
                return false;
            }

            //----upload here


        }; //dash.uploadFiles();



        dash.profile = JSON.stringify($rootScope.Profile);

       

    }; //dashCtrl



    dashCtrl.$inject = ['$rootScope', '$scope'];

    app.component('dashboardComponent', {
        templateUrl: 'app/views/dashboard.html',
        controller: dashCtrl,
        controllerAs: 'dash', 
      
    });

})();