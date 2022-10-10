import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { attachAuthorizationHeader } from '../../services/api';

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  token: '',
  setToken: (token: string) => set(() => {
    attachAuthorizationHeader(token);
    window.localStorage.setItem('token', token);
    return { token, isAuthenticated: true };
  }),
  removeToken: () => set(() => ({ token: '', isAuthenticated: false }))
}));

mountStoreDevtool('auth', useAuthStore);

export default useAuthStore;