import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "../backend/client";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userEvent, setUserEvent] = useState(null);
  const navigate = useNavigate();

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setUser(data.user);
    } else {
      navigate("/", { replace: true });
    }
  };

  const sendPasswordEmail = async () => {
    const userEmail = await user.email;
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      userEmail,
      {
        redirectTo: "https://plandecuentas.netlify.app/contraseña",
      }
    );

    if (error) throw error;
    console.log("sending...");
    console.log(userEmail);
  };

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUserEvent(event);
        console.log(event);

        if (event === "SIGNED_IN") {
          navigate("/cuentas", { replace: true });
        }
        checkUser();
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userEvent, sendPasswordEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
