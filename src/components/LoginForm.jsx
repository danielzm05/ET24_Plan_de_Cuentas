import "../styles/LoginForm.css";

export function LoginForm() {
  return (
    <section className="login-container">
      <h1>Bienvenido!</h1>
      <form>
        <label htmlFor="email">Correo electrónico</label>
        <input
          className="input-data"
          type="email"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          className="input-data"
          type="password"
          id="password"
          name="password"
          required
        />
        <input type="submit" value="Ingresar" />
      </form>
    </section>
  );
}
