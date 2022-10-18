import PageContainer from '../../components/PageContainer';
import { Group, Button, Container } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { Link } from 'wouter';
import { useQuery } from 'react-query';
import useStyles from './styles';
import { DevicesService } from '../../services';
import DeviceInfo from '../../components/DeviceInfo';

interface DeviceDetailsProps {
  id: number | string;
}

const DeviceDetails = ({ id }: DeviceDetailsProps) => {
  const { classes } = useStyles();

  const { data: device } = useQuery('showDevice', () => DevicesService.show(id), {
    cacheTime: 0
  });

  return (
    <PageContainer>
      <Group mb='3rem'>
        <Link to='/devices'>
          <Button leftIcon={<IconArrowLeft />} variant='light'>
            Back to devices
          </Button>
        </Link>
      </Group>

      {device && (
        <Container className={classes.container}>
          <DeviceInfo device={device}/>
        </Container>
      )}
    </PageContainer>
  );
};

export default DeviceDetails;