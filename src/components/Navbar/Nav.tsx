import { useState } from 'react';
import NavbarLink from './NavbarLink';
import { Navbar, Stack } from '@mantine/core';
import {
  IconLogout,
  IconDeviceLaptop,
} from '@tabler/icons';
import useAuthStore from '../../store/auth/useAuthStore';

const Nav = () => {
  const [active, setActive] = useState('devices');

  const removeToken = useAuthStore(state => state.removeToken);

  const onLogout = () => {
    removeToken();
  };

  return (
    <Navbar
      height='100vh'
      width={{ base: 80 }}
      p='md'
      sx={(theme) => ({
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
      })}
    >
      <Navbar.Section grow>
        <Stack justify='center' spacing={0}>
          <NavbarLink
            icon={IconDeviceLaptop}
            key='devices'
            label='Devices'
            active={'devices' === active}
            onClick={() => setActive('devices')}
          />
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify='center' spacing={0}>
          <NavbarLink icon={IconLogout} label='Logout' onClick={onLogout}/>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default Nav;