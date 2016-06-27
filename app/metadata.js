
metricsUI.factory("Metadata", function() {
    var Metadata = function() {
        this.keys = []
        this.data = {}
    }
    Metadata.prototype.clear = function(key, value) {
        this.keys = []
        this.data = {}
    }


    Metadata.prototype.add_field = function(key, value) {
        if (this.keys.indexOf(key) == -1){
            this.keys.push(key)
        }
        this.data[key] = value
    }
    Metadata.prototype.remove_field = function(key) {
        index = this.keys.indexOf(key)
        if ( index != -1){
            this.keys.splice(index, 1);
            delete this.data[key]
        }
    }
    return Metadata
});