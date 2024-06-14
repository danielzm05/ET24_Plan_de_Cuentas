import "../styles/Login.css";
import { useState } from "react";
import { supabase } from "../backend/client";

export function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await supabase.auth.signInWithOtp({
        email,
      });

      console.log(result);
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          className="input-data"
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Ingresar" />
      </form>
    </section>
  );
}
