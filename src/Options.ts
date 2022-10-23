import { AbstractFileGenerator } from './generators';

type Options = {
  openApiPath: string
  basePath: string
  generators: AbstractFileGenerator[];
}

export default Options;
