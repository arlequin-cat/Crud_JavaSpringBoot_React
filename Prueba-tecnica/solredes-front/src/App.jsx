import { Routes, Route } from "react-router-dom";
import { Participantes } from "./pages/Participantes";
import { EventProvider } from "./context/EventContext";
import { Overview } from "./pages/Overview";
import { Deportes } from "./pages/Deportes";
import Inscripciones from "./pages/Inscripciones";
import "./App.css";

function App() {
  return (
      <EventProvider>
        <Routes>
          <Route path="/" element={<Overview />} />
            <Route
              path="/Espacio-de-trabajo/participantes"
              element={<Participantes />}
            />
            <Route path="/Espacio-de-trabajo/deportes" element={<Deportes />} />
            <Route
              path="/Espacio-de-trabajo/inscripciones"
              element={<Inscripciones />}
            />
        </Routes>
      </EventProvider>
  );
}

export default App;
