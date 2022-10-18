import api from '../api';
import Device from './Device';

interface ReqInput {
  id: string | number;
  name: string;
  description: string;
}

interface ReqResponse {
  device: Device;
}

const edit = async ({ id, name, description }: ReqInput) => {
  const { data } = await api.patch<ReqResponse>(`devices/${id}`, {
    device: {
      name,
      description
    }
  });

  return data.device;
};

export default edit;
