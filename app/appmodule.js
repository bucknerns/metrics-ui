var MetricsApp = angular.module("MetricsApp", ["infinite-scroll"]);

/* I am also tossing one off javascript in here*/

/*
Works like templates, inserts a file in the html tag.
Example: <div data-load="navbar.html"></div> will insert the contents of
navbar.html into the content of the div tag
*/

$(function(){
    $("[data-load]").each(function(){
        $(this).load($(this).data("load"), function(){});
    });
})

MetricsApp.directive("navigation", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/navigation.html',
       replace: true
   }
});

MetricsApp.directive("sidebar", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/sidebar.html',
       replace: true
   }
});