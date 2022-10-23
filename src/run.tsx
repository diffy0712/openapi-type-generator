import { render } from 'ink';
import { configure } from 'mobx';
import React from 'react';
import OpenapiCodeGeneratorCli from './App';
import FileGenerators from './features/FileGenerators/FileGenerators';
import { SchemaFileGenerator, ServiceFileGenerator } from './generators';

configure({
  enforceActions: 'never',
})

// This class just loads the openapi as json and calls the generators and passing the openapi json object as parameter
// then the generators can do whatever they want with the openapi in ts.
// you can:
//     - generate a schema.ts containing all schemas
//     - generate schemas/{schema}.ts - one file for each schmea
//     - generate services for endpoints
//     - generate mock data for endpoints from examples
//     - create json mock server endpoints using example data

render(<>
  <OpenapiCodeGeneratorCli
    openApiPath="./example-api.json"
    basePath="./generated"
    generators={[
      new ServiceFileGenerator({
        basePath: './generated',
        fileName: 'services.ts'
      }),
      new SchemaFileGenerator()
    ]}
  />
</>);
