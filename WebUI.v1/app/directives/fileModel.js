(function () {

    'use strict';

    app.directive('fileModel', function () {

        return {
            scope: true,
            link: function (scope, el, attrs) {
                el.on('change', function (event) {
                    var files = event.target.files;
                    for (var i = 0; i < files.length; i++) {
                        console.info('file selected: ' + files[i].name);
                        scope.$emit('selectedFile', { file: files[i] });
                    }
                });
            }
        };
    });


})();