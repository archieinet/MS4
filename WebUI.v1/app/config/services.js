(function () {
    'use strict';

    var services = function ($http, $q, CONST) {
        //API
        

        var GET = function (url, u) {
            //var d = $q.defer();
            //$http.get(CONST.API + url, {
            //    params: u,
            //    'Developer': 'AP',
            //    'Version': '1.0.0'
            //})
            //    .then(function (data, status, headers, config) {
            //        return d.resolve(data);
            //    })
            //    .catch(function (data, status, headers, config) {
            //        return d.reject('ERROR: ' + data.statusText);
            //    });

            //d.promise;


            $http.get(CONST.API + url, {
                params: u,
                'Developer': 'AP',
                'Version': '1.0.0'
            });


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

        

        return {
            fetch: GET,
            add: POST,
            update: PUT
        };




    }; // services

    services.$inject = ['$http', '$q', 'appConst'];

    app.service('services', services);

})();