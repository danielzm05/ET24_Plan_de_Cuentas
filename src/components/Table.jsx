import "../styles/Table.css";

export function Table({ title, children }) {
  return (
    <div className="table">
      <h2 className="table-name">{title}</h2>

      {children}
    </div>
  );
}

export function TableOptions({ children, handleSearch }) {
  return (
    <div className="table-options">
      <input className="search-bar" type="text" placeholder="Buscar.." onChange={handleSearch} />

      <div className="table-tools">{children}</div>
    </div>
  );
}
