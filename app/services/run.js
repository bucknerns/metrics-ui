metricsUI.service("Run", function($http, $routeParams, Metadata, MetricsApiService, $sce) {
    var cls = this
    cls.api = MetricsApiService
    cls.metadata = new Metadata()
    cls.limit = 30
    cls.list_template = "templates/tests.html"
    cls.status = "all"
    cls.statuses = ["all", "passed", "failed", "skipped"]
    cls.attachments = []
    cls.run = {}

    cls.get_graph_url = function() {
        url = "http://metrics.qe.rackspace.net:443/app/kibana#/visualize/edit/pass_fail_skip_by_test_per_run?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:now-90d,mode:quick,to:now))&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:metrics,key:query,negate:!f,value:'status:%20passed'),query:(query_string:(analyze_wildcard:!t,query:'status:%20passed')))),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'_type:%20test%20AND%20_parent:%20"
        url += cls.run.run_id
        url += "')),uiState:(vis:(colors:(Failed:%23BF1B00,Passed:%23447EBC,passed:%23447EBC))),vis:(aggs:!((id:'1',params:(customLabel:'Total%20Tests'),schema:metric,type:count),(id:'3',params:(filters:!((input:(query:(query_string:(analyze_wildcard:!t,query:'status:%20passed'))),label:passed),(input:(query:(query_string:(analyze_wildcard:!t,query:'status:%20failed'))),label:failed),(input:(query:(query_string:(analyze_wildcard:!t,query:'status:%20skipped'))),label:skipped))),schema:segment,type:filters),(id:'4',params:(field:test_name,order:desc,orderBy:'1',size:0),schema:segment,type:terms)),listeners:(),params:(addLegend:!t,addTooltip:!t,isDonut:!t,shareYAxis:!t),title:pass_fail_skip_by_test_per_run,type:pie))"
        return $sce.trustAsResourceUrl(url)
    }

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