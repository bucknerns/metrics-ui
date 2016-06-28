var metricsUI = angular.module("metricsUI", ["infinite-scroll","ngRoute", "ngAnimate"])
metricsUI.controller("RunsControler", function($scope, Tests, Runs) {
    $scope.api = $scope.runs = Runs
    $scope.tests = Tests
})
metricsUI.controller("TestsControler", function($scope, Tests, Runs) {
    $scope.api = $scope.tests = Tests
    $scope.runs = Runs
})


/* Routes*/
metricsUI.config(function($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "templates/filter_list.html",
        controller: "TestsControler",
        controllerAs: "app"}
    ).when("/tests", {
        templateUrl: "templates/filter_list.html",
        controller: "TestsControler",
        controllerAs: "app"}
    ).when("/runs", {
        templateUrl: "templates/filter_list.html",
        controller: "RunsControler",
        controllerAs: "app"}
    ).when("/runs/:id", {
        templateUrl: "templates/run.html",
        controller: "RunsControler",
        controllerAs: "app"}
    ).when("/tests/:id", {
        templateUrl: "templates/test.html",
        controller: "TestsControler",
        controllerAs: "app"}
    )
})
