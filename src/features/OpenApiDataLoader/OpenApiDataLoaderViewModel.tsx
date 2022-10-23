import { action, computed, makeObservable, observable } from 'mobx';
// eslint-disable-next-line camelcase
import {OpenAPIV3_1} from 'openapi-types'
import AppStore from '../../AppStore';
import { sleep } from '../../utils/async';
import { loadJson } from '../../utils/file-system';


export class OpenApiDataLoaderViewModel {
  @observable
  protected _appStore = AppStore;

  @observable
  protected _loading = false;

  @computed
  public get loading(): boolean {
    return this._loading;
  }

  public set loading(value: boolean) {
    this._loading = value;
  }

  public get info(): string {
    return `openapi v${this._appStore.openApiData?.openapi || '-'} - ${this._appStore.openApiData?.info.title || '-'} ${this._appStore.openApiData?.info.version || '-'} `;
  }

  public get schemasTotal(): number {
    return Object.keys(this._appStore.openApiData?.components?.schemas || {}).length;
  }

  public get pathsTotal(): number {
    return Object.keys(this._appStore.openApiData?.paths || {}).length;
  }

  public get serversTotal(): number {
    return Object.keys(this._appStore.openApiData?.servers || {}).length;
  }

  constructor() {
    makeObservable(this);
    if (!this._appStore.isInited) {
      throw new Error('AppStore must be initied before calling this');
    }
  }

  async init(): Promise<void> {
    await this.fetchOpenApi();
  }

  @action
  private async fetchOpenApi(): Promise<void> {
    try {
      this.loading = true;
      this._appStore.openApiData = await loadJson<OpenAPIV3_1.Document>(this._appStore.options!.openApiPath);
      await sleep(3000);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
