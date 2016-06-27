metricsUI.service("Metadata", function() {
    this.keys = []
    this.data = {}
    this.clear = function(key, value) {
        this.keys = []
        this.data = {}
    }


    this.add_field = function(key, value) {
        if (this.keys.indexOf(key) == -1){
            this.keys.push(key)
        }
        this.data[key] = value
    }

    this.remove_field = function(key) {
        index = this.keys.indexOf(key)
        if ( index != -1){
            this.keys.splice(index, 1);
            delete this.data[key]
        }
    }
})