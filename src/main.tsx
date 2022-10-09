import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthService from './services/auth/auth-service';
import useAuthStore from '../store/auth/useAuthStore';

const token = String(window.localStorage.getItem('token'));

const validateToken = (token: string) => {
  return AuthService.validateToken(token)
    .then(() => true)
    .catch(() => false);
};

const isAuthenticated = await validateToken(token);

if (isAuthenticated) {
  const setToken = useAuthStore.getState().setToken;
  setToken(token);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
