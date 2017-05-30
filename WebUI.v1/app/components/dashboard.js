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

            for (var i = 0; i < $scope.files.length; i++) 
                $scope.files.splice(i, 1);
            
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