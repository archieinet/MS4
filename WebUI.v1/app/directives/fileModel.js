(function () {

    'use strict';

    var ctrl = function () {
        var fm = this;
        fm.name = 'archie pliansaneh';
        console.log('directive ctrler');
        console.log(fm);
    }

    var directFunc = function () {
        
        return {
            restrict: 'E',
            scope: true,
            link: function (scope, el, attr) {
                el.bind('change', function (event) {
                    console.log(event);
                });
            } //link
        };

    };


    app.directive('fileModel', directFunc);


})();