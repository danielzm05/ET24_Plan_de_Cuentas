import { Modal } from "../Modal";
import { useState } from "react";
import { supabase } from "../../backend/client";

export function AddUserModal({ isOpen, onClose }) {
  const [userInfo, setUserInfo] = useState({});

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userInfo);

    try {
      const { error } = await supabase.auth.signUp({
        email: userInfo.email,
        password: userInfo.password,
        options: {
          data: {
            first_name: userInfo.nombre,
            last_name: userInfo.apellido,
            id_rol: Number(userInfo.rol),
          },
        },
      });

      if (error) throw error;
      setUserInfo({});
      onClose();
    } catch (error) {
      console.error("Error al registrar y guardar el usuario:", error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Agregar nuevo usuario</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" className="input-data" required onChange={handleInputChange} />
        <label htmlFor="apellido">Apellido:</label>
        <input type="text" name="apellido" id="apellido" className="input-data" required onChange={handleInputChange} />
        <label htmlFor="rol">Rol:</label>
        <select name="rol" id="rol" defaultValue="" className="input-data" onChange={handleInputChange} required>
          <option disabled value="">
            Seleccione un rol
          </option>
          <option value="3">Alumno</option>
          <option value="2">Profesor</option>
        </select>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" className="input-data" required onChange={handleInputChange} />
        <label htmlFor="password">Contraseña:</label>
        <input className="input-data" type="password" id="password" name="password" minLength={6} required onChange={handleInputChange} />

        <div className="buttons-container">
          <input type="submit" value="Agregar Alumno" />
        </div>
      </form>
    </Modal>
  );
}
