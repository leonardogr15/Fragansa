import React, { useState, useEffect } from 'react';
import { createMovie, updateMovie, deleteMovie, getMovies } from '../services/movie.service';
import MovieFormModal from '../components/MovieFormModal';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function MoviesPage() {
  const [list, setList]   = useState([]);
  const [modal, setModal] = useState({ open: false, entity: null });

  const load = async () => {
    try {
      const { data } = await getMovies();
      setList(data);
    } catch {
      toast.error('No se pudieron cargar las películas');
    }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async dto => {
    try {
      if (dto.movieId) {
        await updateMovie(dto.movieId, dto);
        toast.success('Película actualizada');
      } else {
        await createMovie(dto);
        toast.success('Nueva película creada');
      }
      setModal({ open: false, entity: null });
      load();
    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors) {
        const msgs = Object.values(err.response.data.errors).flat().join(', ');
        toast.error(msgs);
      } else {
        toast.error('Error al guardar película');
      }
    }
  };

  const handleDelete = async id => {
    if (window.confirm('¿Eliminar película?')) {
      await deleteMovie(id);
      toast.info('Película eliminada');
      load();
    }
  };

  return (
    <div className="panel-list">
      <div className="table-container">
        <button
          className="btn"
          style={{ marginBottom: '15px' }}
          onClick={() => setModal({ open: true, entity: null })}
        >
          <FaPlus /> Nueva película
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Género</th>
              <th>País</th>
              <th>Director</th>
              <th>Actores</th>
              <th>Sinopsis</th>
              <th>Portada</th>
              <th>Tráiler</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map(m => (
              <tr key={m.movieId}>
                <td>{m.title}</td>
                <td>{m.genreName}</td>
                <td>{m.countryName}</td>
                <td>{m.directorName}</td>
                <td>{m.actorNames.join(', ')}</td>
                <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {m.synopsis}
                </td>
                <td>
                  <img
                    src={m.coverImageUrl}
                    alt={m.title}
                    style={{ width: 60, height: 'auto', borderRadius: 4 }}
                  />
                </td>
                <td>
                  <a
                    href={`${m.trailerCode}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver
                  </a>
                </td>
                <td style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  <button className="btn" onClick={() => setModal({ open: true, entity: m })}>
                    <FaEdit /> Editar
                  </button>
                  <button className="btn" onClick={() => handleDelete(m.movieId)}>
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modal.open && (
          <MovieFormModal
            entity={modal.entity}
            onSave={handleSave}
            onClose={() => setModal({ open: false, entity: null })}
          />
        )}
      </div>
    </div>
  );
}
