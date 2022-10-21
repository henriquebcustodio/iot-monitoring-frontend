import { Button, Group, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Device from '../../../services/devices/Device';

interface EditModalProps {
  isOpen: boolean;
  device: Device;

  onClose(): void;

  onEdit(name: string, description: string): void;
}

interface FormValues {
  name: string;
  description: string;
}

const EditModal = ({ isOpen, onClose, onEdit, device }: EditModalProps) => {
  const form = useForm({
    initialValues: {
      name: device.name,
      description: device.description,
    }
  });

  const handleSubmit = ({ name, description }: FormValues) => {
    onEdit(name, description);
  };

  return (
    <Modal
      title='Edit device'
      centered={true}
      opened={isOpen} onClose={onClose}
    >
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
              type='submit'
            >
              Edit
            </Button>
          </Group>
        </form>
      </Stack>
    </Modal>
  );
};

export default EditModal;