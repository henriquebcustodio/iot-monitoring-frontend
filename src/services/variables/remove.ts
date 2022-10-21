import api from '../api';

const remove = async (id: number | string) => {
  await api.delete(`variables/${id}`);
};

export default remove;
