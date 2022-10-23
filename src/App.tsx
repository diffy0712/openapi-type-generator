import React, { FC, useEffect } from 'react';
import OpenApiDataLoader from './features/OpenApiDataLoader/OpenApiDataLoader';
import FileGenerators from './features/FileGenerators/FileGenerators';
import AppStore from './AppStore';
import Options from './Options';
import { observer } from 'mobx-react-lite';

export type OpenapiCodeGeneratorCliProps = Options;

const OpenapiCodeGeneratorCli: FC<OpenapiCodeGeneratorCliProps> = (props) => {
  useEffect(() => {
    AppStore.init(props);
  }, []);

  return <>
    {AppStore.isInited && (
      <>
        <OpenApiDataLoader />
        <FileGenerators />
      </>
    )}
  </>
};


export default observer(OpenapiCodeGeneratorCli);
