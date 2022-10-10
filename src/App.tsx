import { Fragment } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { Redirect, Route } from 'wouter';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import useAuthStore from './store/auth/useAuthStore';

export default function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
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
          <Route path='/:rest*'>
            <Redirect to='/devices'/>
          </Route>
        }
      </MantineProvider>
    </QueryClientProvider>
  );
}