import { makeObservable, observable } from 'mobx';
import AppStore, { FileGeneratorsStatuses } from '../../AppStore';

export class FileGeneratorsViewModel {
  @observable
  protected _appStore = AppStore;

  public get total(): number {
    return this._appStore.options?.generators.length || 0;
  }

  constructor() {
    makeObservable(this);
    if (!this._appStore.isInited) {
      throw new Error('AppStore must be initied before calling this');
    }
  }

  public init(): void {
    this._appStore.options?.generators.forEach(generator => {
      generator.run();
    });
  }

  public getGeneratorsByState(): ReadonlyArray<[FileGeneratorsStatuses, number, string]> {
    return [
      [FileGeneratorsStatuses.IDLE, this._appStore.statesByStatus(FileGeneratorsStatuses.IDLE).length, ''],
      [FileGeneratorsStatuses.RUNNING, this._appStore.statesByStatus(FileGeneratorsStatuses.RUNNING).length, 'blue'],
      [FileGeneratorsStatuses.DONE, this._appStore.statesByStatus(FileGeneratorsStatuses.DONE).length, 'green'],
      [FileGeneratorsStatuses.FAILED, this._appStore.statesByStatus(FileGeneratorsStatuses.FAILED).length,'red'],
      [FileGeneratorsStatuses.SKIPPED, this._appStore.statesByStatus(FileGeneratorsStatuses.SKIPPED).length, 'grey']
    ];
  }
}
