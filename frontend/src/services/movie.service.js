import api from './api';
export const getMovies   = () => api.get('/movies');
export const createMovie = data => api.post('/movies', data);
export const updateMovie = (id, data) => api.put(`/movies/${id}`, data);
export const deleteMovie = id => api.delete(`/movies/${id}`);