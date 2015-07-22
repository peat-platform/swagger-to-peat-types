Swagger to PEAT types
======================

This module creates PEAT types from the specified swagger resource file.

* By default only models associated with PUT and POST actions are created. The -a flag overrides this and creates all.

* A file is created which maps the endpoint and the action to the type id in the OPENi platform.


Options
=========

Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -s, --swagger [value]       Link to root Swagger resource.
    -o, --peat_server [value]   PEAT server where the types are to be created.
    -f, --file_output [value]   File where output is written to.
    -a, --all                   If specified all Swagger Models are created, otherwise just models associated with PUT operations are created.




Samples
=========

node main.js -s https://dev.peat-platform.org/api-spec/v1/api_framework -o dev.peat-platform.org -f out.json

```json

```

node main.js -s http://petstore.swagger.wordnik.com/api/api-docs -o dev.peat-platform.org -f out.json -a
