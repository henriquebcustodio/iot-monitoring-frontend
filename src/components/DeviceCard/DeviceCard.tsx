import { Card, Text, Button, Group, ThemeIcon, Stack } from '@mantine/core';
import { IconDeviceLaptop} from '@tabler/icons';
import useStyles from './styles';

interface DeviceCardProps {
  name: string;
  description: string;
}

const DeviceCard = ({ name, description }: DeviceCardProps) => {
  const { classes } = useStyles();

  return (
    <Card shadow='sm' p='lg' radius='md' withBorder>
      <Stack className={classes.mainStack}>
        <Stack>
          <Group>
            <ThemeIcon variant='filled'>
              <IconDeviceLaptop />
            </ThemeIcon>
            <Text weight={500}>
              {name}
            </Text>
          </Group>
          <Text
            className={classes.description}
            size='sm'
            color='dimmed'>
            {description || 'No description'}
          </Text>
        </Stack>
        <Button variant='light' color='blue' fullWidth radius='md'>
          Open
        </Button>
      </Stack>

    </Card>
  );
};

export default DeviceCard;