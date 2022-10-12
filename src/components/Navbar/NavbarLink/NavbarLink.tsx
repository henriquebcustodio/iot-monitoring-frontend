import { TablerIcon } from '@tabler/icons';
import { Tooltip, UnstyledButton } from '@mantine/core';
import useStyles from './styles';
import { Link } from 'wouter';

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;

  onClick?(): void;
}

const NavbarLink = ({ icon: Icon, label, active, onClick }: NavbarLinkProps) => {
  const { classes, cx } = useStyles();
  return (
    <Link to='/devices'>
      <Tooltip label={label} position='right' transitionDuration={0}>
        <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
          <Icon stroke={1.5}/>
        </UnstyledButton>
      </Tooltip>
    </Link>
  );
};

export default NavbarLink;