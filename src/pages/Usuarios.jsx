import { NavigationMenu } from "../components/NavigationMenu";

export function Usuarios() {
  return (
    <>
      <NavigationMenu selected="usuarios" />
      <main>
        <h2 className="page-title">Gestionar Usuarios</h2>
      </main>
    </>
  );
}
