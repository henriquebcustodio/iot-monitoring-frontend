import api from '../api';

const remove = async (id: number | string) => {
  await api.delete(`devices/${id}`);
};

export default remove;
