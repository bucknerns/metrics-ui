
metricsUI.controller("ApiControler", function($scope, Tests, Metadata) {
  $scope.tests = new Tests()
  $scope.metadata = new Metadata()
  /*$scope.run_tests = new RunTests()
  $scope.runs = new Runs()
  $scope.run = new Run()
  $scope.attachments = new Attachments()
  $scope.filters = new Filters()
  $scope.stats = new Stats()*/
})

metricsUI.factory("Tests", function($http) {
    var Tests = function() {
        this.items = []
        this.busy = false
        this.show = false
        this.page = 1
        this.limit=30
        this.base_url = "http://127.0.0.1/api"
        this.metadata = ""
        this.status = ""
    }

    Tests.prototype.reinit = function() {
        this.items = []
        this.busy = false
        this.show = false
        this.page = 1
        this.limit=30
        this.base_url = "http://127.0.0.1/api"
        this.metadata = ""
        this.status = ""
    }

    Tests.prototype.next_page = function() {
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
        status = this.status
        this.reinit()
        this.status = status
        angular.forEach(metadata, function(value, key){
            this.metadata = this.metadata + "&" + key + "=" + value
        }.bind(this))
    }

    Tests.prototype.change_status = function( status ) {
        metadata = this.metadata
        this.reinit()
        this.status = "&status=" + value
        this.metadata = metadata
    }


  return Tests
})

