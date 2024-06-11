import "../styles/LogIn.css";

export function LogIn() {
  return (
    <section className="login-container">
      <h1>Bienvenido!</h1>
      <form action="/submit-login" method="post">
        <label for="email">Correo electrónico</label>
        <input
          className="input-data"
          type="email"
          id="email"
          name="email"
          required
        />
        <label for="password">Contraseña:</label>
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
