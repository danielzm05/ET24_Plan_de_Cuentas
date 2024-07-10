import { useState } from "react";
import { supabase } from "../backend/client";

export function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");

  const handleInputChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    console.log("Contraseña cambiada");
  };

  return (
    <>
      <main>
        <h2 className="page-title">Establecer Nueva Contraseña</h2>
        <form id="new-password-form" onSubmit={handleSubmit}>
          <input
            type="password"
            id="new-password"
            placeholder="Nueva contraseña"
            minLength={6}
            onChange={handleInputChange}
            required
          />
          <input type="submit" value="Cambiar Contraseña" />
        </form>
      </main>
    </>
  );
}
