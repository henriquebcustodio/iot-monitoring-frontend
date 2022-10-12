import { Container } from '@mantine/core';
import { ReactNode } from 'react';
import useStyles from './styles';

interface AppContainerProps {
  children: ReactNode
}

const AppContainer = (props: AppContainerProps) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.container}>
      {props.children}
    </Container>
  );
};

export default AppContainer;