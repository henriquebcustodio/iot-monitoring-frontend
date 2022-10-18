import { ActionIcon, Divider, Group, Menu, Paper, Stack, Text, Title } from '@mantine/core';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons';
import useStyles from './styles';
import CopyToClipboard from './CopyToClipboard';
import DeleteModal from './DeleteModal';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { DevicesService } from '../../services';
import { useLocation } from 'wouter';
import Device from '../../services/devices/Device';
import EditModal from './EditModal';

interface DeviceInfoProps {
  device: Device;
}

const DeviceInfo = ({ device }: DeviceInfoProps) => {
  const { classes } = useStyles();

  const [, setLocation] = useLocation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deleteDevice } = useMutation(
    'deleteDevice',
    () => DevicesService.delete(device.id),
    {
      onSuccess: async () => {
        setLocation('/devices');
      }
    });

  const { mutate: editDevice } = useMutation(
    'editDevice',
    DevicesService.edit,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('showDevice');
      }
    });

  const handleOnDelete = async () => {
    setIsDeleteModalOpen(false);
    await deleteDevice();
  };

  const handleOnEdit = async (name: string, description: string) => {
    setIsEditModalOpen(false);
    await editDevice({ id: device.id, description, name });
  };

  return (
    <Paper withBorder className={classes.info} p='md' radius='md'>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => handleOnDelete()}
      />

      <EditModal
        isOpen={isEditModalOpen}
        device={device}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleOnEdit}
      />

      <Group mb='1rem' position='apart' spacing='xs'>
        <Title order={3} weight='500' className={classes.name}>{device.name}</Title>
        <Menu shadow='md'>
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              icon={<IconPencil size={14} />}
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              color='red'
              icon={<IconTrash size={14} />}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Text
        size='sm'
        color='dimmed'
        className={classes.description}
      >
        {device.description || 'No description'}
      </Text>

      <Divider my='1rem' />

      <Stack spacing='xs' mb='1rem'>
        <Group spacing='xs'>
          <Text color='dimmed' size='sm'>Token</Text>
          <CopyToClipboard text={device.token} />
        </Group>
        <Text>••••••••••••••••••••••</Text>
      </Stack>

      <Divider my='1rem' />

      <Stack spacing='xs'>
        <Group spacing='xs'>
          <Text color='dimmed' size='sm'>Topic ID</Text>
          <CopyToClipboard text={device.topicId} />
        </Group>
        <Text size='sm'>{device.topicId}</Text>
      </Stack>
    </Paper>
  );
};

export default DeviceInfo;