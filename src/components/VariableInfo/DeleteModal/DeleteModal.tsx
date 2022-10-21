import { Group, Modal, Text, Button } from '@mantine/core';

interface DeleteModalProps {
  isOpen: boolean;

  onClose(): void;

  onDelete(): void;
}

const DeleteModal = ({ isOpen, onClose, onDelete }: DeleteModalProps) => {
  return (
    <Modal
      title='Delete variable'
      opened={isOpen}
      onClose={() => onClose()}
      centered
    >
      <Text>Do you really want to delete this variable?</Text>
      <Text>If you proceed, all data points will be lost.</Text>
      <Group mt='1rem' position='right'>
        <Button color='red' onClick={() => onDelete()}>Delete</Button>
      </Group>
    </Modal>
  );
};

export default DeleteModal;