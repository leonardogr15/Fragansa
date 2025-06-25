import api from './api';
export const getActors   = () => api.get('/actors');
export const createActor = data => api.post('/actors', data);
export const updateActor = (id, data) => api.put(`/actors/${id}`, data);
export const deleteActor = id => api.delete(`/actors/${id}`);