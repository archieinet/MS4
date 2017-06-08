(function () {
    'use strict';

    var authServiceAPI = function ($uibModal) {
        function userAuthenticated(resp) {
            if (sessionStorage.profile !== undefined)
                sessionStorage.removeItem('profile');
            sessionStorage.setItem('profile', JSON.stringify(resp));

            return resp;
        };

        return function () {
            return $uibModal.open({
                animation: true,
                component: 'loginComponent',
                size: 'md',
            }).result.then(userAuthenticated);
        };

    }; //authServiceAPI

    authServiceAPI.$inject = ['$uibModal'];

    app.service('authService', authServiceAPI);

})();