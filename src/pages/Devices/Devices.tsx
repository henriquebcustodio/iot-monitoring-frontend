import { Container, SimpleGrid, Title } from '@mantine/core';
import useStyles from './styles';
import { useQuery } from 'react-query';
import DevicesService from '../../services/devices/devices-service';
import DeviceCard from '../../components/DeviceCard';

const Devices = () => {
  const { classes } = useStyles();

  const { data: devices } = useQuery('listDevices', DevicesService.list);

  return (
    <Container className={classes.container}>
      <Title className={classes.title} order={2}>Devices</Title>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: 'md' },
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        {devices?.map((device, index) => (
          <DeviceCard key={index} name={device.name} description={device.description} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Devices;