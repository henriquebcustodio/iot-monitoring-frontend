import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  info: {
    height: 'min-content',
    width: '15rem'
  },
  description: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '80%'
  }
}));

export default useStyles;