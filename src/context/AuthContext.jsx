import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "../backend/client";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
});

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setUser(data.user);
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event);
        checkUser();
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
