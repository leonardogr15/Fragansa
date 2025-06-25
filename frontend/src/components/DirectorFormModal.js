import React, { useState, useEffect } from 'react';
import { getCountries } from '../services/country.service';

export default function DirectorFormModal({ entity, onSave, onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [countryId, setCountryId] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries().then(({ data }) => setCountries(data));
    if (entity) {
      setFirstName(entity.firstName);
      setLastName(entity.lastName);
      setCountryId(String(entity.countryId));
    } else {
      setFirstName('');
      setLastName('');
      setCountryId('');
    }
  }, [entity]);

  const handleSubmit = e => {
    e.preventDefault();
    onSave({
      ...(entity && { directorId: entity.directorId }),
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      countryId: parseInt(countryId, 10)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{entity ? 'Editar Director' : 'Nuevo Director'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>País</label>
            <select
              value={countryId}
              onChange={e => setCountryId(e.target.value)}
              required
            >
              <option value="" disabled>Seleccione...</option>
              {countries.map(c => (
                <option key={c.countryId} value={c.countryId}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button type="button" className="btn" onClick={onClose} style={{ marginRight: '0.5rem' }}>
              Cancelar
            </button>
            <button type="submit" className="btn">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}