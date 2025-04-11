import "./style.css"
import { Link } from 'react-router-dom';

function menu() {
    return (
        <nav className="c-menu">
          <Link to="/">Home</Link>
          <Link to="/capturados">Capturados</Link>
          <Link to="/aleatorios">Aleatorios</Link>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>
    )
  }
  
  export default menu