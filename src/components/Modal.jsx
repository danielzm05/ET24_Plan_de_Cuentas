import * as Icon from "react-feather";
import "../styles/Modal.css";

export function Modal({ isOpen, isClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={isClose}>
          <Icon.X />
        </button>
        {children}
      </div>
    </div>
  );
}
