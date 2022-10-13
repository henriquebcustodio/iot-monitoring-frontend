import { Container } from '@mantine/core';
import { ReactNode } from 'react';
import useStyles from './styles';

interface ContentContainerProps {
  children: ReactNode
}

const ContentContainer = (props: ContentContainerProps) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.container}>
      {props.children}
    </Container>
  );
};

export default ContentContainer;