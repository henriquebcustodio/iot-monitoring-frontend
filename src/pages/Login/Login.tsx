import { Anchor, Container, Text, Title } from '@mantine/core';
import { Link } from 'wouter';
import LoginForm from '../../components/LoginForm';
import { WrapperStyles } from './styles';

const Login = () => {
  return (
    <Container sx={WrapperStyles}>
      <Title align="center">
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Link href='/register'>
          <Anchor size="sm">
            Create account
          </Anchor>
        </Link>
      </Text>
      <LoginForm />
    </Container>
  );
};

export default Login;