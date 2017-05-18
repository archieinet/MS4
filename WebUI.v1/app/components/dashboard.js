(function () {



   

    var dashCtrl = function ($rootScope) {
        var dash = this;


        


        dash.profile = JSON.stringify($rootScope.Profile);

       

    }; //dashCtrl



    dashCtrl.$inject = ['$rootScope'];

    app.component('dashboardComponent', {
        templateUrl: 'app/views/dashboard.html',
        //controller: ['$rootScope', dashCtrl],
        controller: dashCtrl,
        controllerAs: 'dash', 
      
    });

})();