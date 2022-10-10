import { Anchor, Container, Text, Title } from '@mantine/core';
import RegistrationForm from '../../components/RegistrationForm';
import { WrapperStyles } from './styles';
import { Link } from 'wouter';

const Login = () => {
  return (
    <Container sx={WrapperStyles}>
      <Title align="center">Welcome to IOT monitoring!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Have an account already?{' '}
        <Link to='/auth'>
          <Anchor size="sm">Sign in</Anchor>
        </Link>
      </Text>
      <RegistrationForm />
    </Container>
  );
};

export default Login;
