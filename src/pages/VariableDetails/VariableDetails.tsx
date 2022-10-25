import PageContainer from '../../components/PageContainer';
import { Group, Button, Container, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { Link } from 'wouter';
import useStyles from './styles';
import { useQuery, useQueryClient } from 'react-query';
import { VariablesService, DataPointsService } from '../../services';
import VariableInfo from '../../components/VariableInfo';
import { useEffect, useState } from 'react';
import { DataPointsSocket } from '../../services/data-points';
import DataPointsTable from '../../components/DataPointsTable';

interface VariableDetailsProps {
  id: number | string;
}

const VariableDetails = ({ id }: VariableDetailsProps) => {
  const { classes } = useStyles();

  const queryClient = useQueryClient();

  const [socket,] = useState(new DataPointsSocket(id));

  const { data: variable } = useQuery('showVariable', () => VariablesService.show(id), {
    cacheTime: 0
  });

  const { data: dataPoints } = useQuery('listDataPoints', () => DataPointsService.list(id), {
    cacheTime: 0
  });

  useEffect(() => {
    socket.subscribe((dataPoint) => {
      queryClient.setQueryData('listDataPoints', (dataPoints) => {
        if (Array.isArray(dataPoints)) {
          dataPoints.unshift(dataPoint);
        }
        return dataPoints;
      });
    });

    return () => {
      socket.stop();
    };
  }, [socket]);

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
            lastDataPoint={dataPoints[0]}
          />
          <Container className={classes.dataPointsContainer}>
            <Title order={3} mb='1.5rem'>Data Points</Title>
            {dataPoints && (
              <DataPointsTable
                dataPoints={dataPoints}
                isNumeric={variable.variableType === 'numeric'}
              />
            )}
          </Container>
        </Container>
      )}
    </PageContainer>
  );
};

export default VariableDetails;