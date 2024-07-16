import { useState } from "react";
import { supabase } from "../backend/client";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [errorLogin, setErrorLogin] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "danielzm2005@gmail.com",
    password: "messi",
  });
  const navigate = useNavigate();

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
      const { error } = await supabase.auth.signInWithPassword({
        email: formValues.email,
        password: formValues.password,
      });

      if (error) {
        setErrorLogin(true);
      } else {
        navigate("/cuentas", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Correo electrónico</label>
      <input className="input-data" type="email" id="email" name="email" required onChange={handleInputChange} value="danielzm2005@gmail.com" />
      <label htmlFor="password">Contraseña</label>
      <input className="input-data" type="password" id="password" name="password" minLength={5} required onChange={handleInputChange} value="messi" />
      {errorLogin && <span className="error-message">⚠︎ Correo o contraseña incorrecta</span>}
      <input type="submit" value="Ingresar" />
    </form>
  );
}
