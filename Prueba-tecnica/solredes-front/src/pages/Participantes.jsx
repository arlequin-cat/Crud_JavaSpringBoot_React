import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/Navbar";
import { useEvent } from "../context/EventContext";

export function Participantes() {
  const {
    getParticipantes,
    crearParticipante,
    actualizarParticipante,
    eliminarParticipante,
    participantes,
  } = useEvent();
  const { register, handleSubmit, reset } = useForm();
  const [disable, setDisable] = useState(false);
  const [editingParticipante, setEditingParticipante] = useState(null);

  useEffect(() => {
    document.title = "Participantes";
    getParticipantes();
  }, []);

  const onSubmit = (data) => {
    setDisable(true);
    crearParticipante(data).then(() => {
      window.location.reload();
    });
  };

  const handleEliminar = (id) => {
    eliminarParticipante(id).then(() => {
      window.location.reload();
    });
  };

  const handleUpdate = (id, data) => {
    actualizarParticipante(id, data).then(() => {
      setEditingParticipante(null);
      getParticipantes();
    });
  };

  const handleEdit = (participante) => {
    setEditingParticipante(participante.id);
    reset({ email: participante.email, nombre: participante.nombre });
  };

  return (
    <div>
      <Navbar /> <h1 className="tittle">Participantes</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
        />
        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", {
            required: { value: true, message: "El nombre es obligatorio*" },
          })}
        />
        <button disabled={disable} className="Button-create">Crear</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {participantes.map((participante) => (
            <tr key={participante.id}>
              <td>{participante.id}</td>
              <td>
                {editingParticipante === participante.id ? (
                  <input
                    type="email"
                    defaultValue={participante.email}
                    {...register("email", { required: true })}
                  />
                ) : (
                  participante.email
                )}
              </td>
              <td>
                {editingParticipante === participante.id ? (
                  <input
                    type="text"
                    defaultValue={participante.nombre}
                    {...register("nombre", { required: true })}
                  />
                ) : (
                  participante.nombre
                )}
              </td>
              <td>
                {editingParticipante === participante.id ? (
                  <>
                    <button
                      onClick={handleSubmit((data) =>
                        handleUpdate(participante.id, data)
                      )}
                    >
                      Guardar
                    </button>
                    <button onClick={() => setEditingParticipante(null)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button className="editar" onClick={() => handleEdit(participante)}>
                      Editar
                    </button>
                    <button className="eliminar" onClick={() => handleEliminar(participante.id)}>
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
