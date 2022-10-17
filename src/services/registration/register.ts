import api from '../api';
import useAuthStore from '../../store/auth/useAuthStore';

interface ReqInput {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface ReqResponse {
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    token: string;
  }
}

const register = async ({ email, password, passwordConfirmation }: ReqInput) => {
  const { data } = await api.post<ReqResponse>('register', {
    user: {
      email,
      password,
      passwordConfirmation
    },
  });

  const token = data.user.token;
  const setToken = useAuthStore.getState().setToken;

  setToken(token);

  return token;
};

export default register;
