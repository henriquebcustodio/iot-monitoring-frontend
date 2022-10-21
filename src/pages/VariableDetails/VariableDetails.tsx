import PageContainer from '../../components/PageContainer';
import { Group, Button, Container, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { Link } from 'wouter';
import useStyles from './styles';
import { useQuery } from 'react-query';
import { VariablesService, DataPointsService } from '../../services';
import VariableInfo from '../../components/VariableInfo';

interface VariableDetailsProps {
  id: number | string;
}

const VariableDetails = ({ id }: VariableDetailsProps) => {
  const { classes } = useStyles();

  const { data: variable } = useQuery('showVariable', () => VariablesService.show(id), {
    cacheTime: 0
  });

  const { data: dataPoints } = useQuery('listDataPoints', () => DataPointsService.list(id), {
    cacheTime: 0
  });

  return (
    <PageContainer>
      <Group mb='3rem'>
        <Link to={`/devices/${variable?.deviceId}`}>
          <Button leftIcon={<IconArrowLeft />} variant='light'>
            Back
          </Button>
        </Link>
      </Group>

      {(variable && dataPoints) && (
        <Container className={classes.container}>
          <VariableInfo
            variable={variable}
            lastDataPoint={dataPoints[dataPoints.length - 1]}
          />
          <Container className={classes.dataPointsContainer}>
            <Title order={3}>Data Points</Title>
          </Container>
        </Container>
      )}
    </PageContainer>
  );
};

export default VariableDetails;