import "../../styles/UI/Button.css";

export function Button({ children, className, onClick }) {
  return (
    <button className={`button-component ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
