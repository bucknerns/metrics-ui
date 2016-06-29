metricsUI.service("MetricsApiService", function($http) {
    this.url = "http://localhost/api"
    this._get_metadata_string = function(metadata) {
        metadata_string = ""
        angular.forEach(metadata, function(value, key){
            metadata_string += "&" + key + "=" + value})
        return metadata_string
    }

    this.filter_attachment = function(attachment_id, filters, type) {
        url = this.url + "/attachments/" + attachment_id + "/filter?jsonp=JSON_CALLBACK"
        if (type) {url += "&type=" + type}
        return $http.post(url, filters)
    }

    this.get_attachment_content = function(attachment_id) {
        url = this.url + "/attachments/" + attachment_id + "/content"
        return $http.jsonp(url)
    }

    this.get_attachment = function(attachment_id) {
        url = this.url + "/attachments/" + attachment_id + "?jsonp=JSON_CALLBACK"
        return $http.jsonp(url)
    }

    this.get_attachments_by_run_id = function(run_id) {
        url = this.url + "/runs/" + run_id + "/attachments?jsonp=JSON_CALLBACK"
        return $http.jsonp(url)
    }

    this.get_attachments_by_test_id = function(test_id) {
        url = this.url + "/tests/" + test_id + "/attachments?jsonp=JSON_CALLBACK"
        return $http.jsonp(url)
    }

    this.get_attachments = function(page, limit) {
        url = this.url + "/attachments?jsonp=JSON_CALLBACK"
        if (limit) {url += "&limit=" + limit}
        if (page) {url += "&page=" + page}
        return $http.jsonp(url)
    }

    this.get_filter = function(name) {
        url = this.url + "/filters/" + name + "?jsonp=JSON_CALLBACK"
        return $http.jsonp(url)
    }

    this.get_filters = function(name) {
        url = this.url + "/filters?jsonp=JSON_CALLBACK"
        return $http.jsonp(url)
    }

    this.get_run = function(run_id) {
        url = this.url + "/runs/" + run_id + "?jsonp=JSON_CALLBACK"
        return $http.jsonp(url)
    }

    this.get_runs = function(status, page, limit, metadata) {
        url = this.url + "/runs?jsonp=JSON_CALLBACK"
        if (status) {url += "&status=" + status}
        if (limit) {url += "&limit=" + limit}
        if (page) {url += "&page=" + page}
        url += this._get_metadata_string(metadata)
        return $http.jsonp(url)
    }

    this.get_test_stats_by_test_id = function(test_id) {
        url = this.url + "/tests/" + test_id + "/stats?jsonp=JSON_CALLBACK"
        return $http.jsonp(url)
    }

    this.get_test_stats_by_test_name = function(name) {
        url = this.url + "/stats/" + name + "?jsonp=JSON_CALLBACK"
        return $http.jsonp(url)
    }

    this.get_test = function(test_id) {
        url = this.url + "/tests/" + test_id + "?jsonp=JSON_CALLBACK"
        return $http.jsonp(url)
    }


    this.get_tests_by_run_id = function(run_id, status, page, limit, metadata) {
        url = this.url + "/runs/" + run_id + "/tests?jsonp=JSON_CALLBACK"
        if (status) {url += "&status=" + status}
        if (limit) {url += "&limit=" + limit}
        if (page) {url += "&page=" + page}
        url += this._get_metadata_string(metadata)
        return $http.jsonp(url)
    }

    this.get_tests = function(status, page, limit, metadata) {
        url = this.url + "/tests?jsonp=JSON_CALLBACK"
        if (status) {url += "&status=" + status}
        if (limit) {url += "&limit=" + limit}
        if (page) {url += "&page=" + page}
        url += this._get_metadata_string(metadata)
        return $http.jsonp(url)
    }
});