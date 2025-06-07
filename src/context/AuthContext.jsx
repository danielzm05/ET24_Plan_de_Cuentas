import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "../backend/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

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

  const getUserInfo = async (userId = user.id) => {
    if (userId) {
      const { data, error } = await supabase.from("usuario").select("*").eq("id_usuario", userId);

      if (error) throw error;
      setUserInfo(data[0]);
    }
  };

  const sendPasswordEmail = async () => {
    const userEmail = await user.email;
    const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
      redirectTo: "https://plandecuentas.netlify.app/contraseña",
    });

    if (error) throw error;
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/");
    setUser(null);
  };

  const signUp = async (nombre, apellido, email, password, role) => {
    const { error } = await supabase.auth
      .signUp({
        email: email,
        password: password,
        options: {
          data: {
            nombre: nombre,
            apellido: apellido,
            rol: role,
          },
        },
      })

    if (error) {
      toast.error("Hubo un error al registrarse. Intente nuevamente");
      throw error;
    }

    return { success: true, email: email };
  };

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUser(data.user);
      getUserInfo(data.user.id);
    } else {
      setUser(null);
      setUserInfo(null);
    }
  };

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserEvent(event);
      checkUser();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userEvent, sendPasswordEmail, userInfo, getUserInfo, signUp, logOut }}>{children}</AuthContext.Provider>
  );
};
