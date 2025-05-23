import { useState, useContext, createContext } from "react";
import { supabase } from "../backend/client";
import { useAuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const LedgerContext = createContext();

export const useLedgerContext = () => {
  return useContext(LedgerContext);
};

export const LedgerProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const { user } = useAuthContext();

  const getEntries = async () => {
    if (user) {
      const { data, error } = await supabase.from("asiento").select("*, cuenta(*)").eq("id_usuario", user.id).order("fecha", { ascending: true });

      console.log(data)
      if (error) throw error;
      setEntries(data);
    }
  };

  const createEntry = async (items) => {
    const { error } = await supabase.from("asiento").insert(items);
    if (error) throw error;

    toast.success("Asiento creado con éxito");
    getEntries();
  };

  const deleteEntry = async (id_asiento) => {
    const { error } = await supabase.from("asiento").delete().eq("id_asiento", id_asiento).eq("id_usuario", user.id);

    if (error) throw error;
    getEntries();
    toast.success(`Asiento eliminado con éxito`);
  };

  return <LedgerContext.Provider value={{ entries, getEntries, createEntry, deleteEntry }}>{children}</LedgerContext.Provider>;
};
