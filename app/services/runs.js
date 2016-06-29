metricsUI.service("Runs", function($http, $routeParams, Metadata, MetricsApiService) {
    var cls = this
    cls.api = MetricsApiService
    cls.metadata = new Metadata()
    cls.limit = 30
    cls.list_template = "templates/runs.html"
    cls.status = "all"
    cls.statuses = ["all", "passed", "failed"]

    cls.init = function() {
        cls.busy = false
        cls.items = []
        cls.page = 1
        cls.show = false
    }

    cls.color = function(item) {
        return {'color-red': item.failed, 'color-green': !item.failed}
    }

    cls.next_page = function() {
        if (cls.busy) return
        cls.busy = true
        cls.show = true
        if ((cls.statuses.indexOf(cls.status) == -1) || (cls.status == "all")){
            status = ""
        } else {
            status = cls.status
        }

        cls.api.get_runs(status, cls.page, cls.limit, cls.metadata.data).success(function(data) {
            if (Object.keys(data).length < 1) {
                cls.show = false
                return
            }
            angular.forEach(data, function(value, key){cls.items.push(value)})
            cls.page = cls.page + 1
            cls.busy = false
            cls.show = false
        })
    }

    cls.change_status = function( status ) {
        cls.status = status
        cls.update()
    }

    cls.update = function() {
        cls.init()
        cls.next_page()
    }

    cls.clear_meta = function() {
        cls.metadata.clear()
        cls.update()
    }

    cls.add_meta_field = function(key, value) {
        cls.metadata.add_field(key, value)
        cls.update()
    }

    cls.remove_meta_field = function(key) {
        cls.metadata.remove_field(key)
        cls.update()
    }

    cls.init()
})
