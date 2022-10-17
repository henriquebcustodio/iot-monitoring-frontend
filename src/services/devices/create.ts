import api from '../api';
import Device from './Device';

interface ReqInput {
  name: string,
  description: string
}

interface ReqResponse {
  device: Device;
}

const create = async ({ name, description }: ReqInput) => {
  const { data } = await api.post<ReqResponse>('devices', {
    device: {
      name,
      description
    }
  });

  return data.device;
};

export default create;
