import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  mainStack: {
    height: '100%',
    justifyContent: 'space-between'
  },
  description: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
}));

export default useStyles;