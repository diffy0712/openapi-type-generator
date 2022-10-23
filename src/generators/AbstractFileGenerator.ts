// eslint-disable-next-line camelcase
import {OpenAPIV3_1} from 'openapi-types'
import {makeObservable, observable} from 'mobx'
import AppStore from '../AppStore';

export type PropertyDefinition = {
  name: string;
  type: string;
};

export type TypescriptSchemaDefinition = {
  name: string;
  props: PropertyDefinition[];
};

export default abstract class AbstractFileGenerator {
  protected _appStore = AppStore;

  protected get openapi(): typeof this._appStore.openApiData {
    return this._appStore.openApiData;
  }

  public abstract run(): Promise<void>;

  protected async clearFolders(paths: string[]): Promise<void> {
    await Promise.all(paths.map(async path => {
      await this.clearFolder(path)
    }))
  }

  protected async clearFolder(path: string): Promise<void> {
    console.log('clear folders', path);
  }

  protected async removeFiles(files: string[]): Promise<void> {
    await Promise.all(files.map(async file => {
      await this.removeFile(file)
    }))
  }

  protected async removeFile(path: string): Promise<void> {
    console.log(path)
  }

  protected getSchemas(): TypescriptSchemaDefinition[] {
    return Object.keys(this.openapi!.components?.schemas || []).map(schemaName => (
      {
        name: schemaName,
        props: Object.keys(this.openapi!.components?.schemas?.[schemaName].properties || []).map(property => ({
          name: property,
          // eslint-disable-next-line camelcase
          type: (this.openapi!.components?.schemas?.[schemaName]?.properties?.[property] as OpenAPIV3_1.SchemaObject)?.type as string,
        })),
      }
    ))
  }
}
