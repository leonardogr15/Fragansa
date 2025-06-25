import React, { useState, useEffect } from 'react';

export default function CountryFormModal({ entity, onSave, onClose }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (entity) setName(entity.name);
    else setName('');
  }, [entity]);

  const handleSubmit = e => {
    e.preventDefault();
    onSave({
      ...(entity && { countryId: entity.countryId }),
      name: name.trim()
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{entity ? 'Editar País' : 'Nuevo País'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div style={{ textAlign: 'right' }}>
            <button type="button" className="btn" onClick={onClose}>
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
