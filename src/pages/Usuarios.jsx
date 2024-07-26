import { NavigationMenu } from "../components/NavigationMenu";
import { CreateButton } from "../components/CreateButton";
import { AdminCoursesTable } from "../components/AdminCoursesTable";
import { AdminUsersTable } from "../components/AdminUsersTable";
export function Usuarios() {
  return (
    <>
      <NavigationMenu selected="usuarios" />
      <main>
        <h2 className="page-title">Gestionar Usuarios</h2>
        <CreateButton />
        <AdminCoursesTable />
        <AdminUsersTable />
      </main>
    </>
  );
}
