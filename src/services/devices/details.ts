import api from '../api';
import Device from './Device';

interface ReqResponse {
  device: Device;
}

const show = async (id: number) => {
  const { data } = await api.get<ReqResponse>(`devices/${id}`);

  return data.device;
};

export default show;
