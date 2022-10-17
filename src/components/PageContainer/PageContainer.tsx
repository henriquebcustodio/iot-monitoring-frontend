import { Container } from '@mantine/core';
import { ReactNode } from 'react';
import useStyles from './styles';

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.container}>
      {children}
    </Container>
  );
};

export default PageContainer;