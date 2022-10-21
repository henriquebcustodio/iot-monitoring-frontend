import { Button, Group, Select, Stack, Textarea, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import Variable from '../../../services/variables/Variable';
import { useMutation, useQueryClient } from 'react-query';
import { VariablesService } from '../../../services';
import { AxiosError } from 'axios';

interface EditModalProps {
  variable: Variable;

  afterEdition(): void;
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

const EditForm = ({ afterEdition, variable }: EditModalProps) => {
  const form = useForm({
    initialValues: {
      name: variable.name,
      description: variable.description,
      label: variable.label,
      variableType: variable.variableType,
    }
  });

  const queryClient = useQueryClient();

  const { mutate: edit } = useMutation('editVariable', VariablesService.edit, {
    onSuccess: () => {
      queryClient.invalidateQueries(['showVariable']);
      queryClient.invalidateQueries('listDataPoints');
      afterEdition();
    },
    onError: (error: AxiosError<{ variable: { label: never[] } }>) => {
      const variableErrors = error.response?.data.variable;
      if (variableErrors?.label) {
        form.setFieldError('label', variableErrors.label);
      }
    }
  });

  const handleSubmit = (data: FormValues) => {
    edit({ id: variable.id, ...data });
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
        {form.isDirty('variableType') && (
          <Text size="xs" color="red">
            If you change this field, all data points will be removed.
          </Text>        )}
        <Group position='right' mt='1.5rem'>
          <Button
            type='submit'
          >
            Edit
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

export default EditForm;