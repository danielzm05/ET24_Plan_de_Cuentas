import { NavigationMenu } from "../components/NavigationMenu";
import { AdminCoursesTable } from "../components/AdminCoursesTable";
import { AdminUsersTable } from "../components/AdminUsersTable";
import { PieChartComponent } from "../components/Charts";
export function Usuarios() {
  return (
    <>
      <NavigationMenu selected="usuarios" />
      <main>
        <h2 className="page-title">Gestionar Usuarios</h2>
        <div className="users-tables">
          <AdminUsersTable />
          <PieChartComponent />
          <AdminCoursesTable />
        </div>
      </main>
    </>
  );
}
