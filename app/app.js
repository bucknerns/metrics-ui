var metricsUI = angular.module("metricsUI", ["infinite-scroll","ngRoute", "ngAnimate"])
metricsUI.controller("RunsControler", function($scope, Runs) {
    $scope.api = Runs
})
metricsUI.controller("RunControler", function($scope, Run) {
    $scope.api = Run
})
metricsUI.controller("TestsControler", function($scope, Tests) {
    $scope.api = Tests
})
metricsUI.controller("TestControler", function($scope, Test) {
    $scope.api = Test
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
        controller: "RunControler",
        controllerAs: "app"}
    ).when("/tests/:id", {
        templateUrl: "templates/test.html",
        controller: "TestControler",
        controllerAs: "app"}
    )
})
