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