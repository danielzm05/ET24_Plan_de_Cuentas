import { Modal } from "../Modal";
import { useSchoolContext } from "../../context/SchoolContext";
import { useState } from "react";

export function JoinCourseModal({ isOpen, onClose }) {
  const { joinCourse } = useSchoolContext();
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCode(/^\d{0,6}$/.test(value) ? value : code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    joinCourse(code);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Unirme a un curso</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="codigo">Código del Curso:</label>
        <input
          type="number"
          name="codigo"
          id="codigo"
          value={code}
          autoComplete="false"
          className={"input-data"}
          onChange={handleChange}
          required
          min={0}
          maxLength={6}
          placeholder={"XXXXXXX"}
        />
        <div className="buttons-container">
          <input type="submit" value="Unirme" />
        </div>
      </form>
    </Modal>
  );
}
