import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
    window.location.reload();
  };

  const linkStyle = ({ isActive }) => ({
    margin: '0 10px',
    textDecoration: isActive ? 'underline' : 'none',
    color: 'white'
  });

  return (
    <div>
      <nav className='nav-bar'>
        <div>
          <NavLink to="/"       style={linkStyle}>Inicio</NavLink>
          <NavLink to="/directors" style={linkStyle}>Directores</NavLink>
          <NavLink to="/genres"    style={linkStyle}>Géneros</NavLink>
          <NavLink to="/countries" style={linkStyle}>Países</NavLink>
          <NavLink to="/actors"    style={linkStyle}>Actores</NavLink>
          <NavLink to="/movies"    style={linkStyle}>Películas</NavLink>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Cerrar sesión
        </button>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
