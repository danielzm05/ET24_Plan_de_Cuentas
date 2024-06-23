import * as Icon from "react-feather";
import { LoginForm } from "../components/LoginForm";
import { MeetingIllustration } from "../components/Illustrations";
import "../styles/Login.css";

export function Login() {
  return (
    <div className="login-container">
      <section className="illustration-section">
        <span className="text-container focus-in-expand">
          <span className="logo">PLAN DE CUENTAS</span>
          <span className="description ">
            El simulador de manejo de cuentas de la ET24!
          </span>
        </span>
        <MeetingIllustration />
      </section>

      <section className="login-section">
        <h1>Bienvenido!</h1>
        <LoginForm />
      </section>
    </div>
  );
}
