var myApp = angular.module('myApp', ['infinite-scroll']);

myApp.controller("apiControler", function($scope, Tests) {
  $scope.tests = new Tests();
});


myApp.factory('Tests', function($http) {
  var Tests = function() {
    this.items = [];
    this.busy = false;
    this.show = false;
    this.page = 1;
    this.limit=100;
    this.base_url = "http://127.0.0.1/api";
  };

  Tests.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;
    this.show = true;
    var url = this.base_url + "/tests?page=" + this.page + "&limit=" + this.limit + "&jsonp=JSON_CALLBACK"

    $http.jsonp(url).success(function(data) {
        if (Object.keys(data).length < 1) {
            this.show = false;
            return;
        }
            angular.forEach(data, function(value, key){
                this.items.push(value);
            }.bind(this));
        this.page = this.page + 1;
        this.busy = false;
        this.show = false;
        }.bind(this));
    };

    Tests.prototype.get_attachments = function( test_id ) {
    var url = this.base_url + "/tests/" + test_id + "/attachments?jsonp=JSON_CALLBACK";

    $http.jsonp(url).success(function(data) {
        return data
        });
    };
  return Tests
});


myApp.controller("navBar", function($scope, Tests) {
  $scope.tests = new Tests();
});


$(function(){
    $("[data-load]").each(function(){
        $(this).load($(this).data("load"), function(){});
    });
})