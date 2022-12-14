import { ActionIcon, Divider, Group, Menu, Modal, Paper, Stack, Text, Title } from '@mantine/core';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons';
import useStyles from './styles';
import CopyToClipboard from './CopyToClipboard';
import DeleteModal from './DeleteModal';
import EditForm from './EditForm';
import { useState } from 'react';
import { Variable } from '../../services/variables';
import { DataPoint } from '../../services/data-points';
import { useMutation } from 'react-query';
import { VariablesService } from '../../services';
import { useLocation } from 'wouter';

interface VariableInfoProps {
  variable: Variable;
  lastDataPoint?: DataPoint;
}

const VariableInfo = ({ variable, lastDataPoint }: VariableInfoProps) => {
  const { classes } = useStyles();

  const [, setLocation] = useLocation();

  const { mutate: deleteVariable } = useMutation(
    'deleteVariable',
    () => VariablesService.delete(variable.id),
    {
      onSuccess: async () => {
        setLocation(`/devices/${variable.deviceId}`);
      }
    });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOnDelete = async () => {
    setIsDeleteModalOpen(false);
    await deleteVariable();
  };

  const formattedLastDataPoint = () => {
    if (lastDataPoint) {
      if (variable.variableType === 'numeric') {
        return Number(lastDataPoint?.value).toFixed(2);
      }
      return String(lastDataPoint?.value);
    }
    return '-';
  };

  return (
    <Stack>
      <Paper withBorder className={classes.info} p='md' radius='md'>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleOnDelete}
        />

        <Modal
          title='Edit variable'
          centered={true}
          opened={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <EditForm
            variable={variable}
            afterEdition={() => setIsEditModalOpen(false)}
          />
        </Modal>

        <Group mb='1rem' position='apart' spacing='xs'>
          <Title order={3} weight='500' className={classes.name}>{variable.name}</Title>
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
          {variable.description || 'No description'}
        </Text>

        <Divider my='1rem' />

        <Stack spacing='xs' mb='1rem'>
          <Group spacing='xs'>
            <Text color='dimmed' size='sm'>Label</Text>
            <CopyToClipboard text={variable.label} />
          </Group>
          <Text className={classes.label}>{variable.label}</Text>
        </Stack>

        <Divider my='1rem' />

        <Stack spacing='xs'>
          <Group spacing='xs'>
            <Text color='dimmed' size='sm'>Type</Text>
            <CopyToClipboard text={variable.variableType} />
          </Group>
          <Text>{variable.variableType}</Text>
        </Stack>
      </Paper>
      <Paper withBorder className={classes.lastDataPoint} p='md' radius='md'>
        <Title order={5} weight='500'>Last Data Point</Title>
        <Text mt='1rem'>
          {formattedLastDataPoint()}
        </Text>
      </Paper>
    </Stack>
  );
};

export default VariableInfo;