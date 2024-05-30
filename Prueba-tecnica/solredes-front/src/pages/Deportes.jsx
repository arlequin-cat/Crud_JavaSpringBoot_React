import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/Navbar";
import { useEvent } from "../context/EventContext";

export function Deportes() {
  const {
    getDeportes,
    crearDeportes,
    actualizarDeporte,
    eliminarDeporte,
    deportes,
  } = useEvent();
  const { register, handleSubmit, reset } = useForm();
  const [disable, setDisable] = useState(false);
  const [editingDeporte, setEditingDeporte] = useState(null);

  useEffect(() => {
    document.title = "Deportes";
    getDeportes();
  }, []);

  const onSubmit = (data) => {
    setDisable(true);
    crearDeportes(data).then(() => {
      window.location.reload();
    });
  };

  const handleEliminar = (id) => {
    eliminarDeporte(id).then(() => {
      window.location.reload();
    });
  };

  const handleUpdate = (id, data) => {
    actualizarDeporte(id, data).then(() => {
      setEditingDeporte(null);
      getDeportes(); // Update the list without reloading
    });
  };

  const handleEdit = (deporte) => {
    setEditingDeporte(deporte.id);
    reset({ nombre: deporte.nombre, descripcion: deporte.descripcion });
  };

  return (
    <div>
      <Navbar /> <h1 className="tittle">Deportes</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", {
            required: true,
          })}
        />
        <input
          type="text"
          placeholder="Descripcion"
          {...register("descripcion", {
            required: true,
          })}
        />
        <button disabled={disable} className="Button-create">Crear</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {deportes.map((deporte) => (
            <tr key={deporte.id}>
              <td>{deporte.id}</td>
              <td>
                {editingDeporte === deporte.id ? (
                  <input
                    type="text"
                    defaultValue={deporte.nombre}
                    {...register("nombre", { required: true })}
                  />
                ) : (
                  deporte.nombre
                )}
              </td>
              <td>
                {editingDeporte === deporte.id ? (
                  <input
                    type="text"
                    defaultValue={deporte.descripcion}
                    {...register("descripcion", { required: true })}
                  />
                ) : (
                  deporte.descripcion
                )}
              </td>
              <td>
                {editingDeporte === deporte.id ? (
                  <>
                    <button
                      onClick={handleSubmit((data) =>
                        handleUpdate(deporte.id, data)
                      )}
                    >
                      Guardar
                    </button>
                    <button onClick={() => setEditingDeporte(null)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button className="editar" onClick={() => handleEdit(deporte)}>Editar</button>
                    <button className="eliminar" onClick={() => handleEliminar(deporte.id)}>
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
