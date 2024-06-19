import { Modal } from "../Modal";
import { useState } from "react";
import { supabase } from "../../backend/client";

export function AddStudentModal({ isOpen, onClose }) {
  const [studentInfo, setStudentInfo] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setStudentInfo({
      ...studentInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email: studentInfo.email,
        password: studentInfo.password,
      });

      /* Agregar los demás datos a la tabla Usuario */
      onClose();
    } catch (error) {
      console.error("Error al registrar y guardar el usuario:", error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Agregar nuevo alumno</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          className="input-data"
          required
          onChange={handleInputChange}
        />
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          name="apellido"
          id="apellido"
          className="input-data"
          required
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          className="input-data"
          required
          onChange={handleInputChange}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          className="input-data"
          type="password"
          id="password"
          name="password"
          required
          onChange={handleInputChange}
        />

        <div className="buttons-container">
          <input type="submit" value="Agregar Alumno" />
        </div>
      </form>
    </Modal>
  );
}
