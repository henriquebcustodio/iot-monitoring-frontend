import { Stack, Textarea, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from 'react-query';
import { DevicesService } from '../../services';

interface CreateDeviceFormProps {
  afterCreation(): void;
}

interface FormValues {
  name: string;
  description: string;
}

const CreateDeviceForm = ({ afterCreation }: CreateDeviceFormProps) => {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
    }
  });

  const queryClient = useQueryClient();

  const { isLoading, mutate: create } = useMutation('createDevice', DevicesService.create, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('listDevices');
      afterCreation();
    }
  });


  const handleSubmit = ({ name, description }: FormValues) => {
    create({ name, description });
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label='Name'
          placeholder='Arduino Uno'
          required
          {...form.getInputProps('name')}
        />
        <Textarea
          label='Description'
          mt='md'
          {...form.getInputProps('description')}
        />
        <Group position='right' mt='1.5rem'>
          <Button
            loading={isLoading}
            type='submit'
          >
            Create
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

export default CreateDeviceForm;