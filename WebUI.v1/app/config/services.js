(function () {
    'use strict';

    var services = function ($http, $q, CONST) {
    
        var fetch = function (url, u) {
            var d = $q.defer();
            $http.get(CONST.API + url, {
                params: u,
                'Developer': 'AP',
                'Version': '1.0.0',
                'Content-Type': 'application/json'
            })
                .then(function (data, status, headers, config) {
                    d.resolve(data);
                })
                .catch(function (data, status, headers, config) {
                    d.reject('ERROR: ' + data.statusText);
                });

            d.promise;
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
            fetch: fetch,
            add: POST,
            update: PUT
        };


        
    }; // services

    services.$inject = ['$http', '$q', 'appConst'];

    app.service('services', services);

})();