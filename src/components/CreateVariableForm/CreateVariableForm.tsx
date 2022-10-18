import { Button, Group, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from 'react-query';
import { VariablesService } from '../../services';
import { AxiosError } from 'axios';

interface CreateVariableFormProps {
  deviceId: string | number;

  afterCreation(id: number): void;
}

interface FormValues {
  name: string;
  description: string;
  label: string;
  variableType: string;
}

const variableTypes = [
  'numeric',
  'boolean',
  'text',
];

const CreateVariableForm = ({ deviceId, afterCreation }: CreateVariableFormProps) => {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      label: '',
      variableType: 'numeric',
    }
  });

  const { mutate: create } = useMutation('createVariable', VariablesService.create, {
    onSuccess: (data) => {
      afterCreation(data.id);
    },
    onError: (error: AxiosError<{variable: {label: never[]}}>) => {
      const variableErrors = error.response?.data.variable;
      if (variableErrors?.label) {
        form.setFieldError('label', variableErrors.label);
      }
    }
  });

  const handleSubmit = ({ name, description, label, variableType }: FormValues) => {
    form.clearErrors();
    create({ name, description, label, variableType, deviceId });
  };

  return (

    <Stack>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label='Name'
          placeholder='Temperature'
          required
          {...form.getInputProps('name')}
        />
        <Textarea
          label='Description'
          mt='md'
          {...form.getInputProps('description')}
        />
        <TextInput
          label='Label'
          placeholder='temp'
          required
          mt='md'
          {...form.getInputProps('label')}
        />
        <Select
          label='Type'
          data={variableTypes}
          required
          mt='md'
          {...form.getInputProps('variableType')}
        />
        <Group position='right' mt='1.5rem'>
          <Button
            type='submit'
          >
            Create
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

export default CreateVariableForm;