import api from './api';

export default url => api.get(url).then(res => res.data);
export const fetchEquipmentTypes = () => 
  api.get('/api/equipment-types').then(res => res.data);