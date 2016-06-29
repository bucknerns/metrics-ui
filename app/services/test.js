metricsUI.service("Test", function($http, $routeParams, MetricsApiService) {
    var cls = this
    cls.api = MetricsApiService
    cls.attachments = []
    cls.stats = {}
    cls.test = {}

    cls.update = function() {
        cls.get_test($routeParams.id)
        cls.get_stats($routeParams.id)
        cls.get_attachments($routeParams.id)
    }

    cls.get_test = function(id) {
        if (!id) { return }
        cls.api.get_test(id).success(function(data) {cls.test = data})
    }

    cls.get_stats = function(id) {
        if (!id) { return }
        cls.api.get_test_stats_by_test_id(id).success(function(data) {cls.stats = data})
    }

    cls.get_attachments = function(id) {
        if (!id) { return }
        cls.api.get_attachments_by_test_id(id).success(function(data) {
            cls.attachments = data})
    }
})
