import {
  Container,
  SimpleGrid,
  Title,
  Center,
  Text,
  Button,
  Stack,
  Modal,
  ActionIcon, Group
} from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import useStyles from './styles';
import { useQuery } from 'react-query';
import { DevicesService } from '../../services';
import DeviceCard from '../../components/DeviceCard';
import { useState } from 'react';
import CreateDeviceForm from '../../components/CreateDeviceForm/CreateDeviceForm';

const Devices = () => {
  const { classes } = useStyles();

  const { data: devices } = useQuery('listDevices', DevicesService.list);

  const [isCreationOpen, setIsCreationOpen] = useState(false);

  return (
    <Container className={classes.container}>
      <Modal
        title='New device'
        centered={true}
        opened={isCreationOpen} onClose={() => setIsCreationOpen(false)}>
        <CreateDeviceForm afterCreation={() => setIsCreationOpen(false)}/>
      </Modal>

      <Group mb='3rem'>
        <Title className={classes.title} order={2} mb={0}>
          Devices
        </Title>
        <ActionIcon
          variant='light'
          color='blue'
          onClick={() => setIsCreationOpen(true)}
        >
          <IconPlus />
        </ActionIcon>
      </Group>
      {devices && devices.length < 1 && (
        <Center sx={{ height: '100%' }}>
          <Stack align='center'>
            <Text align='center'>
              You don`t have any devices yet.
              <br/>
              Would you like to create a new one?
            </Text>
            <Button onClick={() => setIsCreationOpen(true)}>Create Device</Button>
          </Stack>
        </Center>
      )}
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: 'md' },
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        {devices?.map((device, index) => (
          <DeviceCard
            key={index}
            name={device.name}
            description={device.description}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Devices;
