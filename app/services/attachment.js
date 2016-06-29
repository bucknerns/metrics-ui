metricsUI.service("Attachment", function($http, $routeParams, MetricsApiService) {
    var cls = this
    cls.api = MetricsApiService
    cls.attachment = {}
    cls.content = ""
    cls.filters = []
    cls.all_filters = []
    cls.types = ["auto", "groupdict", "groups", "match"]

    cls.update = function() {
        cls.get_attachment()
        cls.get_filters()
        if (cls.filters) {
            cls.filter_attachment()
        } else {
            cls.get_content()
        }
    }

    cls.get_attachment = function() {
        if (!$routeParams.id) { return }
        cls.api.get_attachment($routeParams.id).success(function(data) {
            cls.attachment = data
        })
    }

    cls.get_filters = function() {
        if (!id) { return }
        cls.all_filters = []
        cls.api.get_filters().success(function(data) {
            angular.forEach(data, function(value){cls.all_filters.push(value.name)})
        })
    }

    cls.get_content = function() {
        if (!$routeParams.id) { return }
        cls.api.get_attachment_content($routeParams.id).success(function(data) {
            cls.content = data
        })
    }

    cls.add_filter = function(filter) {
        cls.filters.push(filter)
        cls.update()
    }

    cls.clear_filters = function(filter) {
        cls.filters = []
        cls.update()
    }

    cls.filter_attachment = function() {
        if (!$routeParams.id) { return }
        cls.api.filter_attachment($routeParams.id, cls.filters).success(function(data) {cls.content = data})
    }
})
