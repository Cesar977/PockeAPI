import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexto/contexto';
import './style.css'; 

function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerFavoritos = async () => {
      if (favoritos.length === 0) {
        setData([]);
        return;
      }

      const promesas = favoritos.map(async (p) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.id}`);
        return await res.json();
      });

      const resultados = await Promise.all(promesas);
      setData(resultados);
    };

    obtenerFavoritos();
  }, [favoritos]);

  return (
    <div className="favoritos">
      <h2>Favoritos</h2>
      {data.length === 0 ? (
        <p>No hay favoritos aún 🥲</p>
      ) : (
        <section className="c-lista">
          {data.map((poke) => (
            <div
              key={poke.id}
              className="c-lista-pokemon"
              onClick={() => navigate(`/detalle/${poke.name}`)}
            >
              <p>{poke.id}</p>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
                alt={poke.name}
                width="auto"
                height="60"
              />
              <p>{poke.name}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default Favoritos;
