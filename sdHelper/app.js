﻿'use strict';

angular.module("SDHelper", [])

.controller("AppController", ["$scope", "$http", function ($scope, $http) {
    $scope.downloadFile = function () {
        if (set_step_list() !== false) {
            var ver_data = JSON.stringify(serializeForm());
            var step_list = JSON.stringify(set_step_list());

            $http({
                method: 'GET',
                url: 'api/handler',
                responseType: 'arraybuffer',
                params: { ver: ver_data, step: step_list }
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
        }   
    };
}]);

function serializeForm() {
    var form_data = $("#data_ver").serializeArray();

    var data = {};
    var i;
    for (i = 0; i <= 5; i++) {
        data[i.toString()] = form_data[i].value;
    }
    console.log(data);
    return data;
}
$(document).ready(function () {
    var i=0;
    for(i=1;i<=11;i++){
        $("#zero").append("<option value='" + i +"'>" + i + "</option>")
    }
    i = 0;
    for (i = 0; i <= 39; i++) {
        $("#three").prepend("<option value='" + i + "'>" + i + "</option>")
    }
})