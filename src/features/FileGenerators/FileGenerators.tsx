import React, { FC, useEffect } from 'react';
import {observer} from 'mobx-react-lite'
import { useRef } from 'react'
import {Text, Box} from 'ink';
import { FileGeneratorsViewModel } from './FileGeneratorsViewModel';

const FileGenerators: FC = () => {
  const vm = useRef(new FileGeneratorsViewModel());

  useEffect(() => {
    vm.current.init();
  }, [])

  return <>
    <Box flexDirection="column" marginTop={1}>
      <Box>
        <Box width={14}>
          <Text bold>
            Generators:
          </Text>
        </Box>

        {vm.current.getGeneratorsByState().map((status) =>
          <Text bold color={status[2]} key={status[0]}>
            {status[1]} {status[0]},{' '}
          </Text>
        )}

        <Text>{vm.current.total} total</Text>
      </Box>
    </Box>
  </>
};


export default observer(FileGenerators);
