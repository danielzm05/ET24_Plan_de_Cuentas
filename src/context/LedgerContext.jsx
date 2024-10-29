import { useState, useContext, createContext } from "react";
import { supabase } from "../backend/client";
import { useAuthContext } from "./AuthContext";

export const LedgerContext = createContext();

export const useLedgerContext = () => {
  return useContext(LedgerContext);
};

export const LedgerProvider = ({ children }) => {
  const [entries, setEntries] = useState();
  const { user, userInfo, getUserInfo } = useAuthContext();

  const getEntries = async (id = user.id) => {
    if (id) {
      const { data, error } = await supabase.from("Asiento").select("*, Cuenta(*)").eq("id_usuario", id).order("fecha", { ascending: false });

      if (error) throw error;

      console.log(data);
      setEntries(data);
    }
  };

  return <LedgerContext.Provider value={{ entries, getEntries }}>{children}</LedgerContext.Provider>;
};
