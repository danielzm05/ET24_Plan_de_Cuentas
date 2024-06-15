import { LoginForm } from "../components/LoginForm";
import "../styles/Login.css";

export function Login() {
  return (
    <>
      <section className="login-container">
        <h1>Bienvenido!</h1>
        <LoginForm />
      </section>
    </>
  );
}
