(function () {
    'use strict';

    var dashCtrl = function ($rootScope, $scope, $timeout, $http, $q, site) {
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

            /*
            $scope.files.forEach(function (item) {
                console.info(item.name);
            });*/

            $http({
                method: 'POST',
                url: site.API + 'api/UploadFile',
                headers: { 'Content-type': undefined },
                transformRequest: function (data) {
                    var fd = new FormData();
                    fd.append("model", angular.toJson(data.model));
                    for (var i = 0; i < data.files.length; i++) {
                        fd.append("file" + i, data.files[i]);
                    }
                    return fd;
                },
                data: {
                    model: { name: 'archie', lname: 'pliansaneh' },
                    files: $scope.files
                }
            }); //post

             



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

    

    dashCtrl.$inject = ['$rootScope', '$scope', '$timeout', '$http', '$q', 'appConst'];

    app.component('dashboardComponent', {
        templateUrl: 'app/views/dashboard.html',
        controller: dashCtrl,
        controllerAs: 'dash', 
      
    });

})();