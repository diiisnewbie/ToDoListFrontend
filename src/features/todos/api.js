import axiosClient from '../../service/axiosClient';

export const todoApi = {
  getAll: (params = {}) => axiosClient.get('/toDos', { params }), // {search, status}
  create: (data) => axiosClient.post('/toDos', data), // { title, description }
  update: (id, data) => axiosClient.put(`/toDos/${id}`, data), // { title?, description?, status? }
  remove: (id) => axiosClient.delete(`/toDos/${id}`),
  reorder: (payload) => axiosClient.patch('/toDos/reorder', payload), // [{id, position}]
  move: (id, data) => axiosClient.patch(`/toDos/${id}/move`, data),
};