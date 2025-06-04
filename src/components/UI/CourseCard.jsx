import { Link } from "react-router-dom";
import "../../styles/UI/CourseCard.css";

export function CourseCard({ id, name, link }) {
  return(
    <Link to={`/${link}/${id}`}>
      <article className="course-card">
        <h4 className="course-name">{name}</h4>
      </article>
    </Link>
  )
}