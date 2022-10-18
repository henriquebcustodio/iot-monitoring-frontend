import { ActionIcon, Tooltip } from '@mantine/core';
import { IconClipboard } from '@tabler/icons';
import { useClipboard } from '@mantine/hooks';

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard = ({ text }: CopyToClipboardProps) => {
  const clipboard = useClipboard();

  return (
    <Tooltip
      label={clipboard.copied ? 'Copied' : 'Copy'}
      color={clipboard.copied ? 'green' : 'black'}
      withArrow
    >
      <ActionIcon
        onClick={() => clipboard.copy(text)}
      >
        <IconClipboard size={15} />
      </ActionIcon>
    </Tooltip>
  );
};

export default CopyToClipboard;