import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/Navbar";
import { useEvent } from "../context/EventContext";

export default function Inscripciones() {
  const {
    getInscripciones,
    crearInscripciones,
    actualizarInscripcion,
    eliminarInscripcion,
    inscripciones,
  } = useEvent();
  const { register, handleSubmit, reset } = useForm();
  const [disable, setDisable] = useState(false);
  const [editingInscripcion, setEditingInscripcion] = useState(null);

  useEffect(() => {
    document.title = "Inscripciones";
    getInscripciones();
  }, []);

  const onSubmit = (data) => {
    setDisable(true);
    crearInscripciones({
      usuario: {
        id: parseInt(data.codePart, 10),
      },
      deporte: {
        id: parseInt(data.codeDeport, 10),
      },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert("Error al crear la inscripcion: " + error);
      });
  };

  const handleEliminar = (id) => {
    eliminarInscripcion(id).then(() => {
      window.location.reload();
    });
  };

  const handleUpdate = (id, data) => {
    actualizarInscripcion(id, {
      usuario: { id: parseInt(data.codePart, 10) },
      deporte: { id: parseInt(data.codeDeport, 10) },
    }).then(() => {
      setEditingInscripcion(null);
      getInscripciones(); // Update the list without reloading
    });
  };

  const handleEdit = (inscripcion) => {
    setEditingInscripcion(inscripcion.id);
    reset({
      codePart: inscripcion.usuario.id,
      codeDeport: inscripcion.deporte.id,
    });
  };

  return (
    <div>
      <Navbar /> <h1 className="tittle">Inscripciones</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          placeholder="Codigo de participante"
          {...register("codePart", {
            required: true,
          })}
        />
        <input
          type="number"
          placeholder="Codigo de deporte"
          {...register("codeDeport", {
            required: true,
          })}
        />
        <button disabled={disable} className="Button-create">Crear</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Participante</th>
            <th>Deporte</th>
            <th>Fecha Inscripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((inscripcion) => (
            <tr key={inscripcion.id}>
              <td>{inscripcion.id}</td>
              <td>
                {editingInscripcion === inscripcion.id ? (
                  <input
                    type="number"
                    defaultValue={inscripcion.usuario.id}
                    {...register("codePart", { required: true })}
                  />
                ) : (
                  inscripcion.usuario.nombre
                )}
              </td>
              <td>
                {editingInscripcion === inscripcion.id ? (
                  <input
                    type="number"
                    defaultValue={inscripcion.deporte.id}
                    {...register("codeDeport", { required: true })}
                  />
                ) : (
                  inscripcion.deporte.nombre
                )}
              </td>
              <td>{inscripcion.fechaInscripcion}</td>
              <td>
                {editingInscripcion === inscripcion.id ? (
                  <>
                    <button
                      onClick={handleSubmit((data) =>
                        handleUpdate(inscripcion.id, data)
                      )}
                    >
                      Guardar
                    </button>
                    <button onClick={() => setEditingInscripcion(null)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button className="editar" onClick={() => handleEdit(inscripcion)}>
                      Editar
                    </button>
                    <button className="eliminar" onClick={() => handleEliminar(inscripcion.id)}>
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
