metricsUI.service("Run", function($http, $routeParams, Metadata, MetricsApiService) {
    var cls = this
    cls.api = MetricsApiService
    cls.metadata = new Metadata()
    cls.limit = 30
    cls.list_template = "templates/tests.html"
    cls.status = "all"
    cls.statuses = ["all", "passed", "failed", "skipped"]
    cls.attachments = []
    cls.run = {}

    cls.init = function() {
        cls.busy = false
        cls.items = []
        cls.page = 1
        cls.show = false
    }

    cls.change_run = function() {
        cls.status = "all"
        cls.metadata.clear()
        cls.get_run($routeParams.id)
        cls.get_attachments($routeParams.id)
        cls.update()
    }

    cls.get_run = function(id) {
        if (!id) { return }
        cls.api.get_run(id).success(function(data) {cls.run = data})
    }

    cls.get_attachments = function(id) {
        if (!id) { return }
        cls.api.get_attachments_by_run_id(id).success(function(data) {
            cls.attachments = data})
    }

    cls.color = function(item) {
        return {"color-red": item.status === "failed", "color-blue": item.status === "skipped", "color-green": item.status === "passed"}
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

        run_id = $routeParams.id
        cls.api.get_tests_by_run_id(run_id, status, cls.page, cls.limit, cls.metadata.data).success(function(data) {
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