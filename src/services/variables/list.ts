import api from '../api';
import Variable from './Variable';

interface ReqResponse {
  variables: Variable[];
}

const list = async (deviceId: string | number) => {
  const { data } = await api.get<ReqResponse>(`devices/${deviceId}/variables`);

  return data.variables;
};

export default list;
