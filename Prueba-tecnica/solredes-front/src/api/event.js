import axios from "./axios";

export const getParticipantesReq = () => axios.get(`usuarios`);

export const getDeportesReq = () => axios.get(`deporte`);

export const getInscripcionesReq = () => axios.get(`inscripcion`);

export const createParticipanteReq = (data) => axios.post(`usuarios`, data);

export const createDeportesReq = (data) => axios.post(`deporte`, data);

export const createInscripcionesReq = (data) => axios.post(`inscripcion`, data);

export const deleteParticipanteReq = (id) => axios.delete(`usuarios/${id}`);

export const deleteDeportesReq = (id) => axios.delete(`deporte/${id}`);

export const deleteInscripcionesReq = (id) => axios.delete(`inscripcion/${id}`);

export const updateParticipanteReq = (id, data) =>
  axios.put(`usuarios/${id}`, data);

export const updateDeporteReq = (id, data) => axios.put(`deporte/${id}`, data);

export const updateInscripcionReq = (id, data) => axios.put(`inscripcion/${id}`, data);
