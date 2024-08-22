import { Modal } from "../Modal";
import { useState } from "react";
import { supabaseAdmin } from "../../backend/client";
import toast from "react-hot-toast";
import { useSchoolContext } from "../../context/SchoolContext";

export function AddUserModal({ isOpen, onClose }) {
  const { getUsers, createStudent } = useSchoolContext();
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

    try {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: userInfo.email,
        password: userInfo.password,
        user_metadata: {
          first_name: userInfo.nombre,
          last_name: userInfo.apellido,
        },
        email_confirm: true,
      });

      if (error) {
        toast.error(`Error al crear usuario`);
        throw error;
      }
      setUserInfo({});
      getUsers();
      createStudent(data.user.id);
      onClose();
      toast.success(`Usuario creado con éxito`);
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

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" className="input-data" required onChange={handleInputChange} />
        <label htmlFor="password">Contraseña:</label>
        <input className="input-data" type="password" id="password" name="password" minLength={6} required onChange={handleInputChange} />

        <div className="buttons-container">
          <input type="submit" value="Agregar Usuario" />
        </div>
      </form>
    </Modal>
  );
}
