import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  info: {
    height: 'min-content',
    minWidth: '14rem',
    width: '14rem'
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