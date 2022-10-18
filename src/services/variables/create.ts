import api from '../api';
import { Variable } from '../variables';

interface ReqInput {
  deviceId: string | number;
  name: string;
  description: string;
  label: string;
  variableType: string;
}

interface ReqResponse {
  variable: Variable;
}

const create = async ({ deviceId, name, description, label, variableType }: ReqInput) => {
  const { data } = await api.post<ReqResponse>(`/devices/${deviceId}/variables`, {
    variable: {
      name,
      description,
      label,
      type: variableType
    }
  });

  return data.variable;
};

export default create;
