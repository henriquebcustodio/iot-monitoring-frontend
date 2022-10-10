import api from '../api';
import useAuthStore from '../../store/auth/useAuthStore';

interface ReqInput {
  email: string,
  password: string
}

interface ReqResponse {
  token: string;
}

const authenticate = async ({ email, password }: ReqInput) => {
  const { data } = await api.post<ReqResponse>('login', {
    user: {
      email,
      password
    }
  });

  const token = data.token;
  const setToken = useAuthStore.getState().setToken;

  setToken(token);

  return token;
};

export default authenticate;