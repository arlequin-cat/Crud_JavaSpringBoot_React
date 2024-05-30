import { createContext, useContext, useState } from "react";
import {
  getParticipantesReq,
  getDeportesReq,
  getInscripcionesReq,
  createParticipanteReq,
  createDeportesReq,
  createInscripcionesReq,
  deleteParticipanteReq,
  deleteDeportesReq,
  deleteInscripcionesReq,
  updateParticipanteReq,
  updateDeporteReq,
  updateInscripcionReq,
} from "../api/event";
export const EventContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [participantes, setParticipantes] = useState([]);
  const [deportes, setDeportes] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);

  const getParticipantes = async () => {
    try {
      const res = await getParticipantesReq();
      setParticipantes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDeportes = async () => {
    try {
      const res = await getDeportesReq();
      setDeportes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getInscripciones = async () => {
    try {
      const res = await getInscripcionesReq();
      setInscripciones(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const crearParticipante = async (participante) => {
    try {
      const res = await createParticipanteReq(participante);
    } catch (error) {
      console.log(error);
    }
  };

  const crearDeportes = async (deportes) => {
    try {
      const res = await createDeportesReq(deportes);
    } catch (error) {
      console.log(error);
    }
  };

  const crearInscripciones = async (inscripciones) => {
    try {
      const res = await createInscripcionesReq(inscripciones);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarParticipante = async (id) => {
    try {
      const res = await deleteParticipanteReq(id);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarDeporte = async (id) => {
    try {
      const res = await deleteDeportesReq(id);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarInscripcion = async (id) => {
    try {
      const res = await deleteInscripcionesReq(id);
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarParticipante = async (id, participante) => {
    try {
      const res = await updateParticipanteReq(id, participante);
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarDeporte = async (id, deporte) => {
    try {
      const res = await updateDeporteReq(id, deporte);
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarInscripcion = async (id, inscripcion) => {
    try {
      const res = await updateInscripcionReq(id, inscripcion);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EventContext.Provider
      value={{
        getParticipantes,
        getDeportes,
        getInscripciones,
        crearParticipante,
        crearDeportes,
        crearInscripciones,
        eliminarParticipante,
        eliminarDeporte,
        eliminarInscripcion,
        actualizarParticipante,
        actualizarDeporte,
        actualizarInscripcion,
        participantes,
        deportes,
        inscripciones,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
