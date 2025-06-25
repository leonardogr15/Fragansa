import React, { useState, useEffect } from 'react';
import { getGenres }    from '../services/genre.service';
import { getCountries } from '../services/country.service';
import { getDirectors } from '../services/director.service';
import { getActors }    from '../services/actor.service';

export default function MovieFormModal({ entity, onSave, onClose }) {
  const [title, setTitle]           = useState('');
  const [synopsis, setSynopsis]     = useState('');
  const [coverImageUrl, setCover]   = useState('');
  const [trailerCode, setTrailer]   = useState('');
  const [genreId, setGenreId]       = useState('');
  const [countryId, setCountryId]   = useState('');
  const [directorId, setDirectorId] = useState('');
  const [actorIds, setActorIds]     = useState([]);
  const [genres, setGenres]         = useState([]);
  const [countries, setCountries]   = useState([]);
  const [directors, setDirectors]   = useState([]);
  const [actors, setActors]         = useState([]);

  useEffect(() => {
    getGenres().then(r => setGenres(r.data));
    getCountries().then(r => setCountries(r.data));
    getDirectors().then(r => setDirectors(r.data));
    getActors().then(r => setActors(r.data));

    if (entity) {
      setTitle(entity.title || '');
      setSynopsis(entity.synopsis || '');
      setCover(entity.coverImageUrl || '');
      setTrailer(entity.trailerCode || '');
      setGenreId(String(entity.genreId || ''));
      setCountryId(String(entity.countryId || ''));
      setDirectorId(String(entity.directorId || ''));
      setActorIds(
        Array.isArray(entity.movieActors)
          ? entity.movieActors.map(ma => String(ma.actorId))
          : []
      );
    } else {
      setTitle('');
      setSynopsis('');
      setCover('');
      setTrailer('');
      setGenreId('');
      setCountryId('');
      setDirectorId('');
      setActorIds([]);
    }
  }, [entity]);

  const toggleActor = actorIdStr => {
    setActorIds(prev =>
      prev.includes(actorIdStr)
        ? prev.filter(id => id !== actorIdStr)
        : [...prev, actorIdStr]
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave({
      movieId: entity?.movieId,
      title,
      synopsis,
      coverImageUrl,
      trailerCode,
      genreId: parseInt(genreId, 10),
      countryId: parseInt(countryId, 10),
      directorId: parseInt(directorId, 10),
      actorIds: actorIds.map(id => parseInt(id, 10)),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{entity ? 'Editar película' : 'Nueva película'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Reseña</label>
            <textarea
              value={synopsis}
              onChange={e => setSynopsis(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Imagen de portada (URL)</label>
            <input
              type="url"
              value={coverImageUrl}
              onChange={e => setCover(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Código de tráiler (YouTube)</label>
            <input
              type="text"
              value={trailerCode}
              onChange={e => setTrailer(e.target.value)}
              placeholder="p.ej. jeQiN0gPIZw"
              required
            />
          </div>
          <div className="form-group">
            <label>Género</label>
            <select
              value={genreId}
              onChange={e => setGenreId(e.target.value)}
              required
            >
              <option value="">Seleccione...</option>
              {genres.map(g => (
                <option key={g.genreId} value={g.genreId}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>País</label>
            <select
              value={countryId}
              onChange={e => setCountryId(e.target.value)}
              required
            >
              <option value="">Seleccione...</option>
              {countries.map(c => (
                <option key={c.countryId} value={c.countryId}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Director</label>
            <select
              value={directorId}
              onChange={e => setDirectorId(e.target.value)}
              required
            >
              <option value="">Seleccione...</option>
              {directors.map(d => (
                <option key={d.directorId} value={d.directorId}>
                  {d.firstName} {d.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Actores</label>
            <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
              {actors.map(a => {
                const idStr = String(a.actorId);
                return (
                  <label key={a.actorId} style={{ display: 'block', marginBottom: '0.25rem' }}>
                    <input
                      type="checkbox"
                      value={idStr}
                      checked={actorIds.includes(idStr)}
                      onChange={() => toggleActor(idStr)}
                    />
                    <span style={{ marginLeft: '0.5rem' }}>
                      {a.firstName} {a.lastName}
                    </span>
                  </label>
                );
              })}
            </div>
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
