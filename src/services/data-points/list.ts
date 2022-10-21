import api from '../api';
import DataPoint from './DataPoint';

interface ReqResponse {
  dataPoints: DataPoint[];
}

const list = async (variableId: number | string) => {
  const { data } = await api.get<ReqResponse>(`/variables/${variableId}/data_points`);

  return data.dataPoints;
};

export default list;
