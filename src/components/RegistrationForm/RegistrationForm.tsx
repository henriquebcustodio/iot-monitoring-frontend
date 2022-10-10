import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Button,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from 'react-query';
import { RegistrationService } from '../../services';

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterForm = () => {
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    validate: {
      passwordConfirmation: (value, values) => value !== values.password ?
        'Passwords did not match' : null
    }
  });
  const {
    isLoading,
    isError,
    mutate: register,
  } = useMutation('register', RegistrationService.register);

  const handleSubmit = ({ email, password, passwordConfirmation }: FormValues) => {
    register({ email, password, passwordConfirmation });
  };

  return (
    <Container>
      <Paper
        withBorder
        shadow='md'
        p={30}
        mt={30}
        radius='md'
        sx={{ width: '22rem' }}
      >
        <form onSubmit={onSubmit(handleSubmit)}>
          <TextInput
            label='Email'
            placeholder='iot@monitoring.com'
            required
            type='email'
            {...getInputProps('email')}
          />
          <PasswordInput
            label='Password'
            placeholder='Your password'
            required
            mt='md'
            {...getInputProps('password')}
          />
          <PasswordInput
            label='Password confirmation'
            placeholder='Confirm your password'
            required
            mt='md'
            {...getInputProps('passwordConfirmation')}
          />
          {isError && (
            <Text size='sm' color='red' mt={20}>
              Something went wrong, please try again.
            </Text>
          )}
          <Button fullWidth mt='xl' type='submit' loading={isLoading}>
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
