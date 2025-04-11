import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  // Al iniciar, leer favoritos guardados
  useEffect(() => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(favoritosGuardados);
  }, []);

  // Cada vez que cambien, guardarlos
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  return (
    <AppContext.Provider value={{ favoritos, setFavoritos }}>
      {children}
    </AppContext.Provider>
  );
};
