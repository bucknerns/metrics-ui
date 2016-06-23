/*global angular */
var metricsUI = angular.module('metricsUI', []);

metricsUI.controller('main', ['$scope', '$http', function ($scope, $http) {
    'use strict';
    //$httpProvider.defaults.withCredentials = true;
    $http.get('http://104.239.149.127/api/runs')
        .success(function (response) {
            $scope.runs = response;
        })
        .error(function (data, status) {
            console.log(data);
    });
}]);
