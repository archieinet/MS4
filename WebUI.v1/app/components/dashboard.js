(function () {


    var dashCtrl = function ($rootScope) {
        var dash = this;



    }; //dashCtrl

    app.component('dashboardComponent', {
        templateUrl: 'app/views/dashboard.html',
        controller: ['$rootScope', dashCtrl],
        controllerAs: 'dash'

    });

})();