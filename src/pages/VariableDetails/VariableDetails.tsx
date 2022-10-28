import PageContainer from '../../components/PageContainer';
import { Group, Button, Container, Title, Modal, ActionIcon } from '@mantine/core';
import { IconArrowLeft, IconTimeline } from '@tabler/icons';
import { Link } from 'wouter';
import useStyles from './styles';
import { useQuery, useQueryClient } from 'react-query';
import { VariablesService, DataPointsService } from '../../services';
import VariableInfo from '../../components/VariableInfo';
import { useEffect, useState } from 'react';
import { DataPoint, DataPointsSocket } from '../../services/data-points';
import DataPointsTable from '../../components/DataPointsTable';
import LineChart from '../../components/LineChart';
import { DateTime } from 'luxon';
import { Variable } from '../../services/variables';
import BooleanChart from '../../components/BooleanChart';

interface VariableDetailsProps {
  id: number | string;
}

const VariableDetails = ({ id }: VariableDetailsProps) => {
  const { classes } = useStyles();

  const queryClient = useQueryClient();

  const [socket,] = useState(new DataPointsSocket(id));

  const [isChartOpen, setIsChartOpen] = useState(false);

  const { data: variable } = useQuery('showVariable', () => VariablesService.show(id), {
    cacheTime: 0
  });

  const { data: dataPoints } = useQuery('listDataPoints', () => DataPointsService.list(id), {
    cacheTime: 0
  });

  const getChart = (variable: Variable, dataPoints: DataPoint[]) => {
    if (variable?.variableType === 'numeric') {
      return (
        <LineChart
          title={variable.name || 'Data Points'}
          xData={dataPoints.slice().reverse().map(dataPoint => {
            return DateTime.fromISO(dataPoint.timestamp).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
          })}
          yData={dataPoints.slice().reverse().map(dataPoint => dataPoint.value)}
          dataLabel={variable.name}
        />
      );
    }

    if (variable?.variableType === 'boolean') {
      return (
        <BooleanChart
          title={variable.name || 'Data Points'}
          xData={dataPoints.slice().reverse().map(dataPoint => {
            return dataPoint.timestamp;
          })}
          yData={dataPoints.slice().reverse().map(dataPoint => dataPoint.value)}
          dataLabel={variable.name}
        />
      );
    }
  };

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
            <Group mb='1rem'>
              <Title order={3}>Data Points</Title>
              {(variable.variableType === 'numeric' || variable.variableType === 'boolean') && (
                <ActionIcon
                  variant='light'
                  color='blue'
                  onClick={() => setIsChartOpen(true)}
                >
                  <IconTimeline />
                </ActionIcon>
              )}
              <Modal opened={isChartOpen} onClose={() => setIsChartOpen(false)} size='xl' centered>
                {(dataPoints && variable) && getChart(variable, dataPoints)}
              </Modal>
            </Group>
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