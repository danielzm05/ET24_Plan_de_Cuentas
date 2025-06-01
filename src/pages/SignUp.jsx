import { useAuthContext } from "../context/AuthContext";

export function SignUp() {
    const { signUp } = useAuthContext();
    const [formValues, setFormValues] = useState();
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
      const { value, name } = e.target;
  
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await signUp(formValues.nombre, formValues.apellido, formValues.email, formValues.password);
  
      setSuccess(response);
    };

  return (
    <main>
      <section className="signup-section">
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="nombre">
            Nombres:
            <input type="text" name="nombre" required onChange={handleInputChange} />
          </label>
          <label htmlFor="apellido">
            Apellido:
            <input type="text" name="apellido" required  onChange={handleInputChange}/>
          </label>
          <label htmlFor="email">
            Email:
            <input type="email" name="email" required onChange={handleInputChange} />
          </label>
          <label htmlFor="password">
            Contraseña:
            <input type="password" name="password" required onChange={handleInputChange} />
          </label>

          <input type="submit" value="Registrarse"  />
        </form>
      </section>
    </main>
  );
}
