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
  const [userInfo, setUserInfo] = useState(null);
  const [userEvent, setUserEvent] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = async (userId) => {
    if (userId) {
      const { data, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("id_usuario", "9a57ce93-6a8b-4803-9883-3f9f1dd75bf0");

      if (error) throw error;
      setUserInfo(data);
    }
  };

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setUser(data.user);
      getUserInfo(data.user.id);
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
  };

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUserEvent(event);
        console.log(event);
        checkUser();
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userEvent, sendPasswordEmail, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
