import api from '../api';

const validateToken = (token: string) => {
  return api.get<{ token: string }>('token', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => response.data);
};

export default validateToken;