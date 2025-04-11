import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexto/contexto';

import Menu from './componentes/menu';
import Aleatorios from './componentes/aleatorios';
import Listas from './componentes/listas';
import Capturados from './componentes/capturados';
import Favoritos from './componentes/favoritos';
import Usuarios from './componentes/usuarios';
import Pokemon from './componentes/pokemon';
import Detalle from './componentes/detalle';

function App() {

  return (
    <AppProvider>
      <Router>
        <Menu />

        <Routes>
          <Route path="/" element={<Listas />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/aleatorios" element={<Aleatorios />} />
          <Route path="/capturados" element={<Capturados />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/detalle/:name" element={<Detalle />} />
          
        </Routes>

      </Router>
    </AppProvider>
  );
}

export default App;