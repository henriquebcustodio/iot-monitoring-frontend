import { ActionIcon, Divider, Group, Menu, Paper, Stack, Text, Title } from '@mantine/core';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons';
import useStyles from './styles';
import CopyToClipboard from './CopyToClipboard';
import DeleteModal from './DeleteModal/DeleteModal';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { DevicesService } from '../../services';
import { useLocation } from 'wouter';
import Device from '../../services/devices/Device';

interface DeviceInfoProps {
  device: Device;
}

const DeviceInfo = ({ device }: DeviceInfoProps) => {
  const { classes } = useStyles();

  const [, setLocation] = useLocation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutate: deleteDevice } = useMutation(
    'createDevice',
    () => DevicesService.delete(device.id),
    {
      onSuccess: async () => {
        setLocation('/devices');
      }
    });

  const handleOnDelete = async () => {
    setIsDeleteModalOpen(false);
    await deleteDevice();
  };

  return (
    <Paper withBorder className={classes.info} p='md' radius='md'>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => handleOnDelete()}
      />

      <Group mb='1rem' position='apart'>
        <Title order={3} weight='500'>{device.name}</Title>
        <Menu shadow='md'>
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconPencil size={14} />}>Edit</Menu.Item>
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