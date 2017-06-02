(function () {
    'use strict';

    var services = function ($http, $q, CONST) {
        //API
        var GET = function (url, u) {
            $http.get(CONST.API + url, {
                params: u,
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

        function succResp(resp) {
            return resp.data;
        };
        function erroResp(resp) {
            return $q.reject('ERROR status: ' +
                resp.status);
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