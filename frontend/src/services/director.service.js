import api from './api';

export const getDirectors   = () => api.get('/directors');
export const createDirector = data => api.post('/directors', data);
export const updateDirector = (id, data) => api.put(`/directors/${id}`, data);
export const deleteDirector = id => api.delete(`/directors/${id}`);
