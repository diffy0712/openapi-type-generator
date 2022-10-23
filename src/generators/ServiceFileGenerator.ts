import { sleep } from '../utils/async';
import AbstractFileGenerator from './AbstractFileGenerator'

export type ServiceFileGeneratorOptions = {
  basePath: string;
  fileName: string;
};

class ServiceFileGenerator extends AbstractFileGenerator {
  protected _options: ServiceFileGeneratorOptions;

  constructor(options: ServiceFileGeneratorOptions) {
    super()
    this._options = options;
  }

  async run(): Promise<void> {
    await sleep(2000);
  }
}

export default ServiceFileGenerator
