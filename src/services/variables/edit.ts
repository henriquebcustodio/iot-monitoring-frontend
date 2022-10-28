import api from '../api';
import Variable from './Variable';

interface ReqInput {
  id: string | number;
  name: string;
  description: string;
  label: string;
  variableType: 'numeric' | 'boolean' | 'text'
}

interface ReqResponse {
  variable: Variable;
}

const edit = async ({ id, name, description, label, variableType }: ReqInput) => {
  const { data } = await api.patch<ReqResponse>(`variables/${id}`, {
    variable: {
      name,
      description,
      label,
      type: variableType
    }
  });

  return data.variable;
};

export default edit;
