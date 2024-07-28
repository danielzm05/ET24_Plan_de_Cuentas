import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import { useSchoolContext } from "../../context/SchoolContext";

export function ModifyUserModal({ isOpen, onClose, user, userId }) {
  const [userModified, setUserModified] = useState(false);
  const { updateUser } = useSchoolContext();

  useEffect(() => {
    setUserModified({
      nombre: user?.nombre,
      apellido: user?.apellido,
      id_rol: user?.id_rol,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserModified({ ...userModified, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userModified.nombre, userModified.apellido, userModified.id_rol, userId);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Modificar usuario</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" className="input-data" value={userModified.nombre} required onChange={handleChange} />
        <label htmlFor="apellido">Apellido:</label>
        <input type="text" name="apellido" id="apellido" className="input-data" value={userModified.apellido} required onChange={handleChange} />
        <label htmlFor="id_rol">Rol:</label>
        <select name="id_rol" id="id_rol" className="input-data" value={userModified.id_rol} onChange={handleChange} required>
          <option disabled value="">
            Seleccione un rol
          </option>
          <option value="3">Alumno</option>
          <option value="2">Profesor</option>
        </select>

        <div className="buttons-container">
          <input type="submit" value="Modificar Usuario" />
        </div>
      </form>
    </Modal>
  );
}
