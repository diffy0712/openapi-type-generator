import React, { FC, useEffect } from 'react';
import {observer} from 'mobx-react-lite'
import { useRef } from 'react'
import {Text, Box} from 'ink'
import { OpenApiDataLoaderViewModel } from './OpenApiDataLoaderViewModel';

const OpenApiDataLoader: FC= () => {
  const vm = useRef(new OpenApiDataLoaderViewModel());

  useEffect(() => {
    vm.current.init();
  }, [])

  return <>
      <Box flexDirection="column" marginTop={1}>
      <Box>
        <Box width={14}>
          <Text bold>
            Openapi:
          </Text>
        </Box>

        {vm.current.loading && (
          <Text bold color="blue">Fetching...</Text>
        )}
        {!vm.current.loading && (
          <>
            <Text bold color="green">Fetched! </Text>
            <Text bold color="blue">{vm.current.info} (</Text>
            <Text bold color="grey">{vm.current.serversTotal} Server(s), </Text>
            <Text bold color="pink">{vm.current.schemasTotal} Schema(s), </Text>
            <Text bold color="yellow">{vm.current.pathsTotal} Path(s)</Text>
            <Text bold color="blue">)</Text>
          </>
        )}
      </Box>
    </Box>
  </>
};


export default observer(OpenApiDataLoader);
