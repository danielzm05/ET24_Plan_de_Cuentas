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

  const getEntries = async (id = user.id) => {
    if (id) {
      const { data, error } = await supabase.from("Asiento").select("*, Cuenta(*)").eq("id_usuario", id).order("fecha", { ascending: true });

      if (error) throw error;

      setEntries(data);
    }
  };

  const createEntry = async (newEntry) => {
    console.log(newEntry);
    const { error } = await supabase.from("Asiento").insert([
      {
        fecha: newEntry.fecha,
        debe: newEntry.debe ? newEntry.debe : null,
        haber: newEntry.haber ? newEntry.haber : null,
        id_cuenta: newEntry.id_cuenta,
        id_usuario: user.id,
      },
    ]);

    if (error) throw error;

    toast.success("Asiento creado con éxito");
    getEntries();
  };

  const deleteEntry = async (id) => {
    const { error } = await supabase.from("Asiento").delete().eq("id_asiento", id).eq("id_usuario", user.id);

    if (error) throw error;
    getEntries();
    toast.success(`Asiento eliminado con éxito`);
  };

  return <LedgerContext.Provider value={{ entries, getEntries, createEntry, deleteEntry }}>{children}</LedgerContext.Provider>;
};
