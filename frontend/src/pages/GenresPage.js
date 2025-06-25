import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getGenres, createGenre, updateGenre, deleteGenre } from '../services/genre.service';
import GenreFormModal from '../components/GenreFormModal';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function GenresPage() {
  const [list, setList]   = useState([]);
  const [modal, setModal] = useState({ open: false, entity: null });

  const load = async () => {
    try {
      const { data } = await getGenres();
      setList(data);
    } catch {
      toast.error('No se pudieron cargar los géneros');
    }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async genre => {
    try {
      const payload = { 
        genreId: genre.genreId,
        name: genre.name.trim() 
      };

      if (genre.genreId) {
        await updateGenre(genre.genreId, payload);
        toast.success('Género actualizado');
      } else {
        await createGenre(payload);
        toast.success('Nuevo género creado');
      }

      setModal({ open: false, entity: null });
      load();
    } catch {
      toast.error('Error al guardar género');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar género?')) return;
    await deleteGenre(id);
    toast.info('Género eliminado');
    load();
  };

  return (
    <div className="panel-list">
      <div className="table-container">
        <button style={{marginBottom: '15px'}} className="btn" onClick={() => setModal({ open: true, entity: null })}>
          <FaPlus /> Nuevo género
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map(g => (
              <tr key={g.genreId}>
                <td>{g.name}</td>
                <td style={{ display:'flex', justifyContent:'center', gap:'0.5rem' }}>
                  <button className="btn" onClick={() => setModal({ open: true, entity: g })}>
                    <FaEdit /> Editar
                  </button>
                  <button className="btn" onClick={() => handleDelete(g.genreId)}>
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modal.open && (
          <GenreFormModal
            entity={modal.entity}
            onSave={handleSave}
            onClose={() => setModal({ open: false, entity: null })}
          />
        )}
      </div>
    </div>
  );
}
