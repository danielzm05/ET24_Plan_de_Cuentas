import { useState } from "react";
import { useAccounts } from "../context/AccountContext";
import { useAuthContext } from "../context/AuthContext";

export function ChangeCompanyName() {
  const { userInfo } = useAuthContext();
  const { updateCompanyName } = useAccounts();
  const [name, setName] = useState(userInfo.empresa ? userInfo.empresa : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateCompanyName(name);
  };

  return (
    <section className="settings-section change-name">
      <h3>Modificar nombre de mi empresa</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="empresa">Nombre de tu empresa:</label>
        <input name="empresa" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="submit" value="Modificar" />
      </form>
    </section>
  );
}
