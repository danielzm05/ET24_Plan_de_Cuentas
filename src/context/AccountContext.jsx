import { useContext, createContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { supabase } from "../backend/client";

export const AccountContext = createContext();

export const useAccounts = () => {
  const context = useContext(AccountContext);
  return context;
};

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [modifications, setModifications] = useState([]);
  const { user } = useAuthContext();

  const getModifications = async () => {
    const { data, error } = await supabase
      .from("Modificacion")
      .select("*")
      .order("fecha", { ascending: false });

    if (error) throw error;

    setModifications(data);
  };

  const createModification = async (descripcion) => {
    const { error } = await supabase.from("Modificacion").insert([
      {
        descripcion: descripcion,
        id_usuario: user.id,
      },
    ]);

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
    createModification(
      `${user.identities[0].identity_data.last_name} ${user.identities[0].identity_data.first_name}Creó ${nombre} (${codigo}) `
    );
  };

  const deleteAccount = async (id, nombre) => {
    const { error } = await supabase
      .from("Cuenta")
      .delete()
      .eq("id_cuenta", id)
      .eq("id_usuario", user.id);

    if (error) throw error;
    getAccounts();
    createModification(
      `${user.identities[0].identity_data.last_name} ${user.identities[0].identity_data.first_name} Eliminó ${nombre} `
    );
  };

  const updateAccount = async (id, codigo, nombre, tipo, cuenta) => {
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
    createModification(
      `${user.identities[0].identity_data.last_name} ${user.identities[0].identity_data.first_name} Modificó ${cuenta.nombre} (${cuenta.codigo}, ${cuenta.tipo})  a  ${nombre}  (${codigo},${tipo})`
    );
  };
  return (
    <AccountContext.Provider
      value={{
        accounts,
        modifications,
        getModifications,
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
