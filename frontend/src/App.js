import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import DirectorsPage from './pages/DirectorsPage';
import GenresPage from './pages/GenresPage';
import CountriesPage from './pages/CountriesPage';
import ActorsPage from './pages/ActorsPage';
import MoviesPage from './pages/MoviesPage';

function App() {
  const isAuth = Boolean(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        toastStyle={{
          maxWidth: '320px',
          padding: '0.75rem 1rem', 
          whiteSpace: 'normal'   
        }}
        bodyStyle={{  
          margin: 0,
          whiteSpace: 'pre-wrap', 
        }}
      />

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={isAuth ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<WelcomePage />} />
          <Route path="directors" element={<DirectorsPage />} />
          <Route path="genres" element={<GenresPage />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="actors" element={<ActorsPage />} />
          <Route path="movies" element={<MoviesPage />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={isAuth ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
