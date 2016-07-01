metricsUI.service("Test", function($http, $routeParams, MetricsApiService, $sce) {
    var cls = this
    cls.api = MetricsApiService
    cls.attachments = []
    cls.stats = {}
    cls.test = {}

    cls.get_graph_url = function() {
        url = "http://metrics.qe.rackspace.net:443/app/kibana#/visualize/edit/pass_fail_over_time_by_test_name?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-90d,mode:quick,to:now))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'_type:%20test%20AND%20test_name:%20"
        url += cls.test.test_name
        url += "')),uiState:(spy:(mode:(fill:!f,name:!n))),vis:(aggs:!((id:'1',params:(customLabel:'Instance%20Total'),schema:metric,type:count),(id:'2',params:(customInterval:'2h',customLabel:'Day%20of%20run',extended_bounds:(),field:start_time,interval:auto,min_doc_count:1),schema:segment,type:date_histogram),(id:'3',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:'status:%20passed'))),label:Passing),(input:(query:(query_string:(analyze_wildcard:!t,query:'status:%20failed'))),label:Failing))),schema:group,type:filters),(id:'4',params:(),schema:radius,type:count)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,defaultYExtents:!f,drawLinesBetweenPoints:!t,interpolate:linear,radiusRatio:'7',scale:'square%20root',setYExtents:!f,shareYAxis:!t,showCircles:!t,smoothLines:!f,times:!(),yAxis:()),title:pass_fail_over_time_by_test_name,type:line))"
        return $sce.trustAsResourceUrl(url)
    }

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
