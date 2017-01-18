'use strict';

angular.module("SDHelper", [])

.controller("AppController", ["$scope", "$http", function ($scope, $http) {
    $scope.downloadFile = function () {
        alert("");
        $http({
            method: 'GET',
            url: 'api/handler',
            responseType: 'arraybuffer',
            params: { ver: localStorage.global }
        }).success(function (data, status, headers) {
            headers = headers();

            var filename = headers['x-filename'];
            var contentType = headers['content-type'];

            var linkElement = document.createElement('a');
            try {
                var blob = new Blob([data], { type: contentType });
                var url = window.URL.createObjectURL(blob);

                linkElement.setAttribute('href', url);
                linkElement.setAttribute("download", filename);

                var clickEvent = new MouseEvent("click", {
                    "view": window,
                    "bubbles": true,
                    "cancelable": false
                });
                linkElement.dispatchEvent(clickEvent);
            } catch (ex) {
                console.log(ex);
            }
        }).error(function (data) {
            console.log(data);
        });
    };
}]);
