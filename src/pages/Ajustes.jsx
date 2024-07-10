import { NavigationMenu } from "../components/NavigationMenu";
import { useAuthContext } from "../context/AuthContext";

export function Ajustes() {
  const { sendPasswordEmail } = useAuthContext();
  return (
    <>
      <NavigationMenu selected="alumnos" />
      <main>
        <h2 className="page-title">Ajustes</h2>

        <h3>Cambiar Contraseña</h3>
        <p>
          Al presionar el botón se enviara un correo a tu mail para cambiar tu
          contraseña
        </p>
        <button onClick={sendPasswordEmail}>
          Solicitar Cambio de Contraseña
        </button>
      </main>
    </>
  );
}
