var app = angular.module('app-chims', [
        'ui.router'
]);


//--------delete all after this line
app.provider('appname', function () {
    this.$get = function () {

        var appName = 'MS4.ORG',
            appDesc = 'Upload shared file services';


        return {
            appName: appName,
            appDesc:appDesc
        };
    };

}); //app.provider

app.controller('appCtrl', function(appname){
    var vm = this;
    vm.appName = appname.appName;
    vm.appDesc = appname.appDesc;
});

(function () {
    'use strict';

    var controller = function () {


    }; //controller







    app.component('login', {
            templateUrl: './views/login.html',
            controller: controller,
            controllerAs: 'login'

        });

})();