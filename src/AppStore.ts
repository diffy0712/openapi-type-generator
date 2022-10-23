import { action, computed, makeObservable, observable } from 'mobx';
import Options from './Options';
// eslint-disable-next-line camelcase
import {OpenAPIV3_1} from 'openapi-types'

export enum FileGeneratorsStatuses {
  IDLE = 'Idle',
  RUNNING = 'Running',
  SKIPPED = 'Skipped',
  DONE = 'Done',
  FAILED = 'Failed',
}

export class CliState {
  public status: FileGeneratorsStatuses = FileGeneratorsStatuses.IDLE;
  public name = '';
  public message = '';
}
class AppStore {
  @observable
  protected _options: Options | null = null;

  @computed
  public get options(): typeof this._options {
    return this._options;
  }

  @computed
  public get isInited(): boolean {
    return this.options !== null;
  }

  @observable
  protected _states: CliState[] = [] as CliState[];

  public get states(): typeof this._states {
    return this._states;
  }

  @observable
  protected _openApiData?: OpenAPIV3_1.Document;

  public get openApiData(): OpenAPIV3_1.Document | undefined {
    return this._openApiData;
  }

  public set openApiData(value: OpenAPIV3_1.Document | undefined) {
    this._openApiData = value;
  }

  public statesByStatus(status: FileGeneratorsStatuses): CliState[] {
    return this._states.filter((state) => state.status === status);
  }

  constructor() {
    makeObservable(this);
  }

  @action
  public async init(options: Options): Promise<void> {
    this._options = options;
  }
}

export default new AppStore();
