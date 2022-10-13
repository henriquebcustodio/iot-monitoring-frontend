import api from '../api';
import Device from './Device';

interface ReqResponse {
  devices: Device[];
}

const list = async () => {
  const { data } = await api.get<ReqResponse>('devices');

  return data.devices;
};

export default list;
