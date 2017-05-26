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