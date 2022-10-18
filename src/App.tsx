import { Fragment } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AppShell, MantineProvider } from '@mantine/core';
import { Redirect, Route, Switch } from 'wouter';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import Nav from './components/Navbar/Nav';
import ContentContainer from './components/ContentContainer';
import Devices from './pages/Devices/Devices';
import useAuthStore from './store/auth/useAuthStore';
import DeviceDetails from './pages/DeviceDetails';

export default function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        {!isAuthenticated && (
          <Fragment>
            <Route path='/auth' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/:rest*'>
              <Redirect to='/auth' />
            </Route>
          </Fragment>
        )}
        {isAuthenticated && (
          <AppShell
            sx={{
              main: {
                maxHeight: '100vh'
              }
            }}
            navbar={<Nav />}
          >
            <ContentContainer>
              <Switch>
                <Route path='/devices'>
                  <Devices />
                </Route>
                <Route path='/devices/:id'>
                  {(params) => (<DeviceDetails id={params.id} />)}
                </Route>
                <Route path='/:rest*'>
                  <Redirect to='/devices' />
                </Route>
              </Switch>
            </ContentContainer>
          </AppShell>
        )}
      </MantineProvider>
    </QueryClientProvider>
  );
}