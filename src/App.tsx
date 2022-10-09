import { QueryClientProvider, QueryClient } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { Route, useLocation } from 'wouter';
import Login from './pages/Login';
import useAuthStore from '../store/auth/useAuthStore';

export default function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation('/auth');
  }

  return (
    <QueryClientProvider client={new QueryClient()}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Route path='/auth' component={Login}/>
      </MantineProvider>
    </QueryClientProvider>
  );
}