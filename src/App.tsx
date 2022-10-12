import { Fragment } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { Redirect, Route } from 'wouter';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import useAuthStore from './store/auth/useAuthStore';
import Nav from './components/Navbar/Nav';
import AppContainer from './components/AppContainer/AppContainer';

export default function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppContainer>
          {!isAuthenticated &&
              <Fragment>
                <Route path='/auth' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/:rest*'>
                  <Redirect to='/auth'/>
                </Route>
              </Fragment>

          }
          {isAuthenticated &&
              <Fragment>
                <Nav />
                <Route path='/devices'>

                </Route>
                <Route path='/:rest*'>
                  <Redirect to='/devices'/>
                </Route>
              </Fragment>
          }
        </AppContainer>
      </MantineProvider>
    </QueryClientProvider>
  );
}