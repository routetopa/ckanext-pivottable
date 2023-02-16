import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit
from logging import getLogger
from ckan.common import json
import ckan as ckan

log = getLogger(__name__)

class PivottablePlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IResourceView, inherit=True)

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'pivottable')

    # IResourceView
    
    def info(self):
        return { 
                 'name': 'pivottable',
                 'title': 'Pivot Table',
                 'icon': 'table',
                 'default_title': 'Pivot Table',
               }

    def can_view(self, data_dict):
        resource = data_dict['resource']
        _format = resource.get('format', None)
        if (resource.get('datastore_active') or resource.get('url') == '_datastore_only_resource'):
            return True 
        if _format:
            return _format.lower() in ['csv', 'tsv', 'xls', 'xlsx']
        else:
            return False

    def view_template(self, context, data_dict):
        return "pivottable-view.html"

    def setup_template_variables(self, context, data_dict):
        return {'resource_json': json.dumps(data_dict['resource']),
        		'resource_view_json': json.dumps(data_dict['resource_view'])}
