var metricsUI = angular.module("metricsUI", ["infinite-scroll"]);

/* I am also tossing one off javascript in here*/

/*
Works like templates, inserts a file in the html tag.
Example: <div data-load="navbar.html"></div> will insert the contents of
navbar.html into the content of the div tag
*/

metricsUI.controller("ApiControler", function($scope, Tests, Metadata) {
  $scope.tests = new Tests()
  $scope.metadata = Metadata
  /*$scope.run_tests = new RunTests()
  $scope.runs = new Runs()
  $scope.run = new Run()
  $scope.attachments = new Attachments()
  $scope.filters = new Filters()
  $scope.stats = new Stats()*/
})

metricsUI.directive("navigation", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/navigation.html',
       replace: true
   }
});

metricsUI.directive("sidebar", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/sidebar.html',
       replace: true
   }
});


metricsUI.directive('onEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});