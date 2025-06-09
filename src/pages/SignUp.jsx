import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import "../styles/pages/SignUpPage.css";

export function SignUp() {
  const { signUp } = useAuthContext();
  const [formValues, setFormValues] = useState();
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signUp(formValues.nombre, formValues.apellido, formValues.email, formValues.password, formValues.rol);

    setSuccess(response);
  };

  return (
    <main className="signup-page">
      <section className="signup-section">
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <label>
            Rol:
            <div className="role-options">
              <label>
                Alumno
                <input type="radio" name="rol" value={3} required onChange={handleInputChange} />
              </label>
              <label>
                Profesor
                <input type="radio" name="rol" value={2} required onChange={handleInputChange} />
              </label>
            </div>
          </label>
          <label htmlFor="nombre">
            Nombres:
            <input type="text" className="input-data" name="nombre" required onChange={handleInputChange} />
          </label>
          <label htmlFor="apellido">
            Apellidos:
            <input type="text" className="input-data" name="apellido" required onChange={handleInputChange} />
          </label>
          <label htmlFor="email">
            Email:
            <input type="email" className="input-data" name="email" required onChange={handleInputChange} />
          </label>
          <label htmlFor="password">
            Contraseña:
            <input type="password" className="input-data" name="password" minLength={5} required onChange={handleInputChange} />
          </label>

          <input type="submit" value="Registrarse" />
        </form>

        {success && (
          <div className="success-message">
            <p>Ya estas registrado! revisa tu correo electrónico para confirmar tu cuenta.</p>
          </div>
        )}
      </section>
    </main>
  );
}
