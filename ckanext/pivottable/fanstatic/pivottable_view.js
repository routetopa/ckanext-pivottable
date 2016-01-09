this.ckan.module('pivottable_view', function(jQuery, _) {
    return {
        initialize: function() {
            jQuery.proxyAll(this, /_on/);
            this.options.resource = JSON.parse(this.options.resource);
            this.options.resourceView = JSON.parse(this.options.resourceView);
            this.el.ready(this._onReady);
        },
        _onReady: function() {
            var resourceData = this.options.resource,
                    resourceView = this.options.resourceView;
            this.loadPivotTableView(resourceData, resourceView);
        },
        renderPivotTable: function(data) {
            console.log("Here...");
            console.log(data)
            var derivers = $.pivotUtilities.derivers;
            var renderers = $.extend(
                            $.pivotUtilities.renderers,
                            $.pivotUtilities.c3_renderers,
                            $.pivotUtilities.d3_renderers
                            );
            $("#output").pivotUI(data, {
                        renderers: renderers});
        },
        loadPivotTableView: function(resourceData, resourceView) {
            var self = this;
            if (!resourceData.datastore_active) {
                resourceData.backend = 'dataproxy';
            } else {
                resourceData.backend = 'ckan';
                resourceData.endpoint = jQuery('body').data('site-root') + 'api/action/datastore_search?resource_id=' + resourceView.resource_id;
                console.log(resourceData.endpoint)

            }
            if (resourceData.backend == 'ckan') {
                var response = $.getJSON(resourceData.endpoint, function(data) {
                    self.renderPivotTable(data.result.records);
                });
                response.fail(function() {
                    $("#output").html("<b>Failed to load the data</b>");
                });
            } else {
                var response = $.ajax({
                    url: "http://jsonpdataproxy.appspot.com",
                    jsonp: "callback",
                    dataType: "jsonp",
                    timeout: 10000,
                    data: {
                        url: resourceData.url,
                        'max-results': 1000,
                        type: resourceData.format
                    },
                    success: function(response) {
                        response.data.unshift(response.fields);
                        self.renderPivotTable(response.data);
                    }
                });
                response.fail(function() {
                    $("#output").html("<b>Failed to load the data</b>");
                });

            }

        }
    };
});
