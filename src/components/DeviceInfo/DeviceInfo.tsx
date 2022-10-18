import { ActionIcon, Divider, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons';
import useStyles from './styles';
import CopyToClipboard from './CopyToClipboard';

interface DeviceInfoProps {
  name: string;
  description: string;
  topicId: string;
  token: string;
}

const DeviceInfo = ({ name, description, token, topicId }: DeviceInfoProps) => {
  const { classes } = useStyles();

  return (
    <Paper withBorder className={classes.info} p='md' radius='md'>
      <Group mb='1rem' position='apart'>
        <Title order={3} weight='500'>{name}</Title>
        <ActionIcon>
          <IconDotsVertical />
        </ActionIcon>
      </Group>

      <Text
        size='sm'
        color='dimmed'
        className={classes.description}
      >
        {description || 'No description'}
      </Text>

      <Divider my='1rem' />

      <Stack spacing='xs' mb='1rem'>
        <Group spacing='xs'>
          <Text color='dimmed' size='sm'>Token</Text>
          <CopyToClipboard text={token} />
        </Group>
        <Text>••••••••••••••••••••••</Text>
      </Stack>

      <Divider my='1rem' />

      <Stack spacing='xs'>
        <Group spacing='xs'>
          <Text color='dimmed' size='sm'>Topic ID</Text>
          <CopyToClipboard text={topicId} />
        </Group>
        <Text size='sm'>{topicId}</Text>
      </Stack>
    </Paper>
  );
};

export default DeviceInfo;