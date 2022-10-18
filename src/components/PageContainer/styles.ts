import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container: {
    padding: 0,
    paddingTop: '2rem',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 'unset',
    width: '85%',
    height: '100%',
    boxSizing: 'border-box',
    color: theme.colors.gray[7]
  },
}));

export default useStyles;