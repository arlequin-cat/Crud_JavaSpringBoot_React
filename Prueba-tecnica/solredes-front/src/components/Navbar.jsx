import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <ul>
          <li>
            <Link to={"http://localhost:5173/Espacio-de-Trabajo/participantes"}>
              Participantes
            </Link>
          </li>
          <li>
            <Link to={"http://localhost:5173/Espacio-de-Trabajo/deportes"}>
              Deportes
            </Link>
          </li>
          <li>
            <Link to={"http://localhost:5173/Espacio-de-Trabajo/inscripciones"}>
              Inscripciones
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
