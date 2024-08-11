import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSchoolContext } from "../context/SchoolContext";

export function PieChartComponent() {
  const { users } = useSchoolContext();
  const data = [
    { name: "Estudiantes", value: users.filter((user) => user.id_rol == 3).length },
    { name: "Profesores", value: users.filter((user) => user.id_rol == 2).length },
    { name: "Administradores", value: users.filter((user) => user.id_rol == 1).length },
  ];

  return (
    <ChartContainer title={`${users.length} Usuarios en el Sistema`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={100} fill="#7745b9" dataKey="value" className="chart" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

function ChartContainer({ title, children }) {
  return (
    <div className="chart-container">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
