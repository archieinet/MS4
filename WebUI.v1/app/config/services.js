(function () {
    'use strict';

    var services = function ($http, $q, CONST) {
        //API
        var GET = function (u) {
            $http.get(CONST.API + u, {
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

        function succResp(resp) { return resp.data;};
        function erroResp(resp) { return $q.reject('ERROR status: ' + resp.status); };

        

        return {
            fetch: GET,
            add: POST,
            update: PUT
        };




    }; // services
    app.service('services', ['$http', '$q', 'appConst', services]);

})();