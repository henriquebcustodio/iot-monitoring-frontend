import api from '../api';
import Variable from './Variable';

interface ReqResponse {
  variable: Variable;
}

const show = async (id: string | number) => {
  const { data } = await api.get<ReqResponse>(`variables/${id}`);

  return data.variable;
};

export default show;
