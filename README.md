# CKAN PivotTable extension 

PivotTable provides extension easy analysis and visualization over tabular data using [PivotTable.js]    (https://github.com/nicolaskruchten/pivottable). 
It allows user to reorganize selected columns/rows to obtain desired view of the data.

## Prerequisites

* Install lastest version of CKAN 
* Enable [CKAN DataStore API](http://docs.ckan.org/en/latest/maintaining/datastore.html#the-datastore-api)

## Build instructions 

*Activate python virtual env 

```sh
. /usr/lib/ckan/default/bin/activate
```

*Clone git repository

```sh
git clone https://github.com/routetopa/ckanext-pivottable.git
cd ckanext-pivottable
```

*Build the plugin

```sh
python setup.py develop
```

*Add 'pivottable' plugin to CKAN config file :
```sh
ckan.plugins = stats text_view recline_view pivottable
```

*Add 'pivottable' as view in CKAN config file :
```sh
ckan.views.default_views = image_view text_view recline_view pivottable
```

*Start ckan
```sh
paster serve /etc/ckan/default/development.ini
```


Dvelopment of TET extenstion is supported by European Commision through the [ROUTE-TO-PA project](http://routetopa.eu/) 
