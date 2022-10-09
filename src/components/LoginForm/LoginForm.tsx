import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Button,
  Text
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from 'react-query';
import { AuthService } from '../../services';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    }
  });

  const { isLoading, isError, mutate: login } = useMutation('login', AuthService.authenticate);


  const handleSubmit = ({ email, password }: FormValues) => {
    login({ email, password });
  };

  return (
    <Container>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md" sx={{ width: '22rem' }}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="iot@monitoring.com"
            required
            type="email"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          {isError &&
              <Text size="sm" color="red" mt={20}>
                  Invalid email or password, please try again.
              </Text>
          }
          <Button
            fullWidth
            mt="xl"
            type="submit"
            loading={isLoading}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;