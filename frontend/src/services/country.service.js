import api from './api';
export const getCountries   = () => api.get('/countries');
export const createCountry = data => api.post('/countries', data);
export const updateCountry = (id, data) => api.put(`/countries/${id}`, data);
export const deleteCountry = id => api.delete(`/countries/${id}`);