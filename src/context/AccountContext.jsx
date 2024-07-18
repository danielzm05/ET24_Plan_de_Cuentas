import { useContext, createContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { supabase } from "../backend/client";

export const AccountContext = createContext();

export const useAccounts = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [modifications, setModifications] = useState([]);
  const { user } = useAuthContext();

  const getModifications = async (studentId) => {
    if (studentId) {
      const { data, error } = await supabase.from("Modificacion").select("*").eq("id_usuario", studentId).order("fecha", { ascending: false });

      if (error) throw error;

      setModifications(data);
    }
  };

  const deleteModifications = async (studentId) => {
    if (studentId) {
      const { error } = await supabase.from("Modificacion").delete().eq("id_usuario", studentId);

      if (error) throw error;

      getModifications();
    }
  };

  const createModification = async (descripcion) => {
    const { error } = await supabase.from("Modificacion").insert([{ descripcion: descripcion, id_usuario: user.id }]);
    if (error) throw error;
    getModifications();
  };

  const getAccounts = async (id = user.id) => {
    const { data, error } = await supabase
      .from("Cuenta")
      .select("id_cuenta, codigo, nombre, tipo_cuenta")
      .eq("id_usuario", id)
      .order("codigo", { ascending: true });

    if (error) throw error;

    setAccounts(data);
  };

  const createAccount = async (codigo, nombre, tipo) => {
    const { error } = await supabase.from("Cuenta").insert([
      {
        codigo: codigo,
        nombre: nombre,
        tipo_cuenta: tipo,
        id_usuario: user.id,
      },
    ]);

    if (error) throw error;
    getAccounts();
    createModification(`Creó ${nombre} (${codigo}) `);
  };

  const deleteAccount = async (id, nombre) => {
    const { error } = await supabase.from("Cuenta").delete().eq("id_cuenta", id).eq("id_usuario", user.id);

    if (error) throw error;
    getAccounts();
    createModification(`Eliminó ${nombre} `);
  };

  const updateAccount = async (id, codigo, nombre, tipo = "", cuenta) => {
    const { error } = await supabase
      .from("Cuenta")
      .update({
        id_cuenta: id,
        codigo: codigo,
        nombre: nombre,
        tipo_cuenta: tipo,
      })
      .eq("id_cuenta", id);

    if (error) throw error;
    getAccounts();
    createModification(`Modificó ${cuenta.nombre} (${cuenta.tipo}) a ${nombre} (${tipo})`);
  };
  return (
    <AccountContext.Provider
      value={{
        accounts,
        modifications,
        getModifications,
        deleteModifications,
        getAccounts,
        createAccount,
        deleteAccount,
        updateAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
