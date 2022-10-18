import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  container: {
    height: '85%',
    maxHeight: '85%',
    width: '100%',
    padding: 0,
    margin: 0,
    maxWidth: 'unset',
    display: 'flex',
  },
  variablesContainer: {
    marginLeft: '2rem',
    width: '100%',
    height: '100%',
    maxWidth: 'unset'
  }
}));

export default useStyles;