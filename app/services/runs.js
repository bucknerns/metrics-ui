metricsUI.service("Runs", function($http) {
    this.init = function() {
        this.items = []
        this.busy = false
        this.show = false
        this.page = 1
        this.limit = 30
        this.base_url = "http://127.0.0.1/api"
        this.metadata = ""
        this.status = ""
        this.run = {}
    }

    this.next_page = function() {
        if (this.busy) return
        this.busy = true
        this.show = true
        var url = this.base_url + "/runs?jsonp=JSON_CALLBACK"
        url += "&page=" + this.page
        url += "&limit=" + this.limit
        if (this.status) {url += "&status=" + this.status}
        if (this.metadata) {url += this.metadata}
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

    this.get_run_by_id = function( run_id ) {
        var url = this.base_url + "/runs/" + run_id + "?jsonp=JSON_CALLBACK"
        $http.jsonp(url).success(function(data) {this.run = data}.bind(this))
    }

    this.get_run_by_index = function( index ) {
        this.run = this.items[index]
    }

    this.change_metadata = function( metadata ) {
        status = this.status
        this.init()
        this.status = status
        angular.forEach(metadata, function(value, key){
            this.metadata = this.metadata + "&" + key + "=" + value
        }.bind(this))
    }

    this.change_status = function( status ) {
        metadata = this.metadata
        this.init()
        this.metadata = metadata
        this.status = status

    }
    this.init()
})
