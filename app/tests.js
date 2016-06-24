MetricsApp.controller("ApiControler", function($scope, Tests) {
  $scope.tests = new Tests()
  /*$scope.run_tests = new RunTests()
  $scope.runs = new Runs()
  $scope.run = new Run()
  $scope.attachments = new Attachments()
  $scope.filters = new Filters()
  $scope.stats = new Stats()*/
})


MetricsApp.factory("Tests", function($http) {
    var Tests = function() {
        this.items = []
        this.busy = false
        this.show = false
        this.page = 1
        this.limit=10
        this.base_url = "http://127.0.0.1/api"
        this.metadata = ""
        this.status = ""
    }

    Tests.prototype.reinit = function() {
        this.items = []
        this.busy = false
        this.show = false
        this.page = 1
        this.limit=10
        this.base_url = "http://127.0.0.1/api"
        this.metadata = ""
        this.status = ""
    }

    Tests.prototype.nextPage = function() {
        if (this.busy) return
        this.busy = true
        this.show = true
        var url = this.base_url + "/tests?page=" + this.page + "&limit=" + this.limit + this.metadata + "&jsonp=JSON_CALLBACK"

        $http.jsonp(url).success(function(data) {
            if (Object.keys(data).length < 1) {
                this.show = false
                return
            }
            angular.forEach(data, function(value, key){
                this.items.push(value)
            }.bind(this))
            this.page = this.page + 1
            this.busy = false
            this.show = false
        }.bind(this))
    }

    Tests.prototype.get_test_by_id = function( test_id ) {
        var url = this.base_url + "/tests/" + test_id + "?jsonp=JSON_CALLBACK"
        $http.jsonp(url).success(function(data) {return data})
    }

    Tests.prototype.change_metadata = function( metadata ) {
        this.reinit()
        angular.forEach(metadata, function(value, key){
            this.metadata = this.metadata + "&" + key + "=" + value
        }.bind(this))
    }

    Tests.prototype.change_status = function( status ) {
        this.reinit()
        this.status = "&status=" + value
    }


  return Tests
})


