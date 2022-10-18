import PageContainer from '../../components/PageContainer';
import { Group, Button, Container, Title, ActionIcon, Modal } from '@mantine/core';
import { IconArrowLeft, IconPlus } from '@tabler/icons';
import { Link } from 'wouter';
import { useQuery } from 'react-query';
import useStyles from './styles';
import { DevicesService, VariablesService } from '../../services';
import DeviceInfo from '../../components/DeviceInfo';
import VariablesTable from '../../components/VariablesTable';
import CreateVariableForm from '../../components/CreateVariableForm';
import { useState } from 'react';

interface DeviceDetailsProps {
  id: number | string;
}

const DeviceDetails = ({ id }: DeviceDetailsProps) => {
  const { classes } = useStyles();

  const { data: device } = useQuery('showDevice', () => DevicesService.show(id), {
    cacheTime: 0
  });

  const { data: variables } = useQuery('listVariables', () => VariablesService.list(id), {
    cacheTime: 0
  });

  const [isCreateVariableModalOpen, setIsCreateVariableModalOpen] = useState(false);

  const handleAfterVariableCreation = (id: number) => {
    setIsCreateVariableModalOpen(false);
  };

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
          <DeviceInfo device={device} />
          <Container className={classes.variablesContainer}>
            <Group mb='1rem'>
              <Title order={3}>Variables</Title>
              <ActionIcon
                variant='light'
                color='blue'
                onClick={() => setIsCreateVariableModalOpen(true)}
              >
                <IconPlus />
              </ActionIcon>
              <Modal
                title='Create variable'
                centered={true}
                opened={isCreateVariableModalOpen}
                onClose={() => setIsCreateVariableModalOpen(false)}
              >
                <CreateVariableForm
                  deviceId={id}
                  afterCreation={handleAfterVariableCreation}
                />
              </Modal>
            </Group>
            {variables && <VariablesTable variables={variables} />}
          </Container>
        </Container>
      )}
    </PageContainer>
  );
};

export default DeviceDetails;