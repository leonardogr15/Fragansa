import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getActors, createActor, updateActor, deleteActor } from '../services/actor.service';
import ActorFormModal from '../components/ActorFormModal';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function ActorsPage() {
  const [list, setList] = useState([]);
  const [modal, setModal] = useState({ open: false, entity: null });

  const load = async () => {
    const { data } = await getActors();
    setList(data);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async actor => {
    try {
      const payload = {
        firstName: actor.firstName.trim(),
        lastName:  actor.lastName.trim(),
        countryId: actor.countryId
      };

      if (actor.actorId) {
        await updateActor(actor.actorId, payload);
        toast.success('Actor actualizado');
      } else {
        await createActor(payload);
        toast.success('Nuevo actor creado');
      }

      setModal({ open: false, entity: null });
      load();
    } catch {
      toast.error('Error al guardar actor');
    }
  };

  const handleDelete = async id => {
    if (window.confirm('¿Eliminar actor?')) {
      await deleteActor(id);
      toast.info('Actor eliminado');
      load();
    }
  };

  return (
    <div className="panel-list">
      <div className="table-container">
        <button className="btn"  style={{marginBottom: '15px'}} onClick={() => setModal({ open: true, entity: null })}>
          <FaPlus/>
          Nuevo actor
        </button>
        <table className="table">
          <thead><tr><th>Nombre</th><th>Apellido</th><th>País</th><th>Acciones</th></tr></thead>
          <tbody>
            {list.map(a => (
              <tr key={a.id}>
                <td>{a.firstName}</td>
                <td>{a.lastName}</td>
                <td>{a.country.name}</td>
                <td style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem'}}>
                  <button className="btn" onClick={() => setModal({ open: true, entity: a })}> <FaEdit /> Editar</button>
                  <button className="btn" onClick={() => handleDelete(a.actorId)}> <FaTrash /> Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal.open && (
          <ActorFormModal
            entity={modal.entity}
            onSave={handleSave}
            onClose={() => setModal({ open: false, entity: null })}
          />
        )}
      </div>

    </div>
    
  );
}