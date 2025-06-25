import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCountries, createCountry, updateCountry, deleteCountry } from '../services/country.service';
import CountryFormModal from '../components/CountryFormModal';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function CountriesPage() {
  const [list, setList] = useState([]);
  const [modal, setModal] = useState({ open: false, entity: null });

  const load = async () => {
    try {
      const { data } = await getCountries();
      setList(data);
    } catch {
      toast.error('No se pudieron cargar los países');
    }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async country => {
    try {
      const payload = { 
        countryId: country.countryId,
        name: country.name.trim() 
      };

      if (country.countryId) {
        await updateCountry(country.countryId, payload);
        toast.success('País actualizado');
      } else {
        await createCountry(payload);
        toast.success('Nuevo país creado');
      }

      setModal({ open: false, entity: null });
      load();
    } catch {
      toast.error('Error al guardar país');
    }
  };

  const handleDelete = async id => {
    if (window.confirm('¿Eliminar país?')) {
      await deleteCountry(id);
      toast.info('País eliminado');
      load();
    }
  };

  return (
    <div className="panel-list">
      <div className="table-container">
        <button className="btn"  style={{marginBottom: '15px'}} onClick={() => setModal({ open: true, entity: null })}>
          <FaPlus/>
          Nuevo país
        </button>
        <table className="table">
          <thead><tr><th>Nombre</th><th>Acciones</th></tr></thead>
          <tbody>
            {list.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem'}}>
                  <button className="btn" onClick={() => setModal({ open: true, entity: c })}> <FaEdit /> Editar</button>
                  <button className="btn" onClick={() => handleDelete(c.countryId)}> <FaTrash /> Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal.open && (
          <CountryFormModal
            entity={modal.entity}
            onSave={handleSave}
            onClose={() => setModal({ open: false, entity: null })}
          />
        )}
      </div>
    </div>
  );
}
