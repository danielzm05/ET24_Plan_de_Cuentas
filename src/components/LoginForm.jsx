import { useState } from "react";
import { supabase } from "../backend/client";

export function LoginForm() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await supabase.auth.signInWithPassword({
        email: formValues.email,
        password: formValues.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login-container">
      <h1>Bienvenido!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          className="input-data"
          type="email"
          id="email"
          name="email"
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
        <input type="submit" value="Ingresar" />
      </form>
    </section>
  );
}
