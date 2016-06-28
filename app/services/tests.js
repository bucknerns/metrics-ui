metricsUI.service("Tests", function($http, $routeParams) {
    this.attachments = []
    this.base_url = "http://127.0.0.1/api/tests"
    this.data = {}
    this.keys = []
    this.limit = 30
    this.list_template = "templates/tests.html"
    this.metadata = ""
    this.status = ""
    this.statuses = ["all", "passed", "failed", "skipped"]

    this.stats = {}
    this.test = {}

    this.init = function() {
        this.busy = false
        this.items = []
        this.page = 1
        this.show = false
    }

    this.color = function(item) {
        return {"color-red": item.status === "failed", "color-blue": item.status === "skipped", "color-green": item.status === "passed"}
    }

    this.next_page = function() {
        if (this.busy) return
        this.busy = true
        this.show = true
        var url = this.base_url + "?jsonp=JSON_CALLBACK"
        url += "&page=" + this.page
        url += "&limit=" + this.limit
        url += this.metadata
        /*if (this.status != "all") {url += "&status=" + this.status}*/

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

    this.update_item = function() {
        this.get_test($routeParams.id)
        this.get_stats($routeParams.id)
        this.get_attachments($routeParams.id)
    }

    this.get_test = function(id) {
        if (!$routeParams.id) { return }
        var url = this.base_url + "/" + id + "?jsonp=JSON_CALLBACK"
        $http.jsonp(url).success(function(data) {this.test = data}.bind(this))
    }

    this.get_stats = function(id) {
        if (!$routeParams.id) { return }
        var url = this.base_url + "/" + id + "/stats?jsonp=JSON_CALLBACK"
        $http.jsonp(url).success(function(data) {this.stats = data}.bind(this))
    }

    this.get_attachments = function(id) {
        if (!$routeParams.id) { return }
        var url = this.base_url + "/" + id + "/attachments?jsonp=JSON_CALLBACK"
        $http.jsonp(url).success(function(data) {
            this.attachments = data}.bind(this))
    }

    this.update_metadata = function() {
        this.init()
        this.metadata = ""
        angular.forEach(this.data, function(value, key){
            this.metadata = this.metadata + "&" + key + "=" + value
        }.bind(this))
        this.next_page()
    }

    this.change_status = function( status ) {
        this.init()
        if (this.statuses.indexOf(status) == -1){
            this.status = "all"
        } else {
            this.status = status
        }
        this.next_page()
    }

    this.clear_meta = function() {
        this.keys = []
        this.data = {}
        this.update_metadata()
    }

    this.add_meta_field = function(key, value) {
        if (this.keys.indexOf(key) == -1){
            this.keys.push(key)
        }
        this.data[key] = value
        this.update_metadata()
    }

    this.remove_meta_field = function(key) {
        console.log(key)
        index = this.keys.indexOf(key)
        if ( index != -1){
            this.keys.splice(index, 1);
            delete this.data[key]
        }
        this.update_metadata()
    }

    this.init()
})
