import { Table } from "./components/Table";
import { NavigationMenu } from "./components/NavigationMenu";
import "./App.css";

function App() {
  return (
    <>
      <NavigationMenu />

      <main>
        <Table />
      </main>
    </>
  );
}

export default App;
