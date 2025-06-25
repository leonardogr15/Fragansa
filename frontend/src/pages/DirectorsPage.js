import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDirectors, createDirector, updateDirector, deleteDirector } from '../services/director.service';
import DirectorFormModal from '../components/DirectorFormModal';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function DirectorsPage() {
  const [list, setList] = useState([]);
  const [modal, setModal] = useState({ open: false, entity: null });

  const load = async () => {
    const { data } = await getDirectors();
    setList(data);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async director => {
  try {
    const payload = {
      firstName: director.firstName.trim(),
      lastName:  director.lastName.trim(),
      countryId:  director.countryId
    };

    if (director.directorId) {
      await updateDirector(director.directorId, payload);
      toast.success('Director actualizado');
    } else {
      await createDirector(payload);
      toast.success('Nuevo director creado');
    }

    setModal({ open: false, entity: null });
    load();
  } catch (err) {
    console.error(err);
    if (err.response?.data?.errors) {
      const msgs = Object.values(err.response.data.errors).flat().join(', ');
      toast.error(msgs);
    } else {
      toast.error('Error al guardar director');
    }
  }
};

  const handleDelete = async id => {
    if (window.confirm('¿Eliminar director?')) {
      await deleteDirector(id);
      toast.info('Director eliminado');
      load();
    }
  };

  return (
    <div className="panel-list">
      <div className="table-container">
        <button className="btn" style={{marginBottom: '15px'}} onClick={() => setModal({ open: true, entity: null })}>
          <FaPlus/>
          Nuevo director
        </button>
        <table className="table">
          <thead>
            <tr><th>Nombre</th><th>Apellido</th><th>País</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {list.map(d => (
              <tr key={d.id}>
                <td>{d.firstName}</td>
                <td>{d.lastName}</td>
                <td>{d.country.name}</td>
                <td style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem'}}>
                  <button className="btn" onClick={() => setModal({ open: true, entity: d })}>
                    <FaEdit />
                    Editar
                  </button>
                  <button className="btn" onClick={() => handleDelete(d.directorId)}>
                    <FaTrash />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal.open && (
          <DirectorFormModal
            entity={modal.entity}
            onSave={handleSave}
            onClose={() => setModal({ open: false, entity: null })}
          />
        )}
      </div>
    </div>
    
  );
}