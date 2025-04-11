import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';
import Filtro from '../filtro';

function Lista() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('All');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        if (tipoSeleccionado === 'All') {
          const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
          const json = await res.json();
          setData(json.results);
        } else {
          const res = await fetch(`https://pokeapi.co/api/v2/type/${tipoSeleccionado}`);
          const json = await res.json();
          const listaFiltrada = json.pokemon.map(p => p.pokemon);
          setData(listaFiltrada);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerDatos();
  }, [tipoSeleccionado]);

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
    setBusqueda('');
  };

  // Filtro combinado: por nombre o por número
  const resultados = data.filter((pokemon) => {
    const id = pokemon.url.split("/")[6];
    const nombre = pokemon.name.toLowerCase();
    const termino = busqueda.toLowerCase();

    if (!busqueda) return true;

    if (!isNaN(termino)) {
      return id === termino;
    }

    return nombre.includes(termino);
  });

  return (
    <>
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtro onTipoChange={handleTipoChange} tipoActivo={tipoSeleccionado} />

      <section className='c-lista'>
        {resultados.map((pokemon, index) => {
          const id = pokemon.url.split("/")[6];
          return (
            <div
              className='c-lista-pokemon'
              key={index}
              onClick={() => navigate(`/detalle/${pokemon.name}`)}
            >
              <p>{id}</p>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={`Pokémon ${pokemon.name}`}
                width='auto'
                height='60'
                loading='lazy'
              />
              <p>{pokemon.name}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Lista;

