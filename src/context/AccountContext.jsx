import { useContext, createContext, useState } from "react";
import { supabase } from "../backend/client";

export const AccountContext = createContext();

export const useAccounts = () => {
  const context = useContext(AccountContext);
  return context;
};

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  const getAccounts = async () => {
    const { data: user } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("Cuenta")
      .select("id_cuenta, codigo, nombre, tipo_cuenta")
      .eq("id_user", user.user.id)
      .order("codigo", { ascending: true });

    if (error) throw error;

    setAccounts(data);
  };

  const createAccount = async (id, nombre, tipo) => {
    const { data: user } = await supabase.auth.getUser();

    const { error } = await supabase.from("Cuenta").insert([
      {
        codigo: id,
        nombre: nombre,
        tipo_cuenta: tipo,
        id_user: user.user.id,
      },
    ]);

    if (error) throw error;
    getAccounts();
  };

  const deleteAccount = async (id) => {
    const { data: user } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("Cuenta")
      .delete()
      .eq("id_cuenta", id)
      .eq("id_user", user.user.id);

    if (error) throw error;
    getAccounts();
  };

  const updateAccount = async (id, codigo, nombre, tipo) => {
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
  };
  return (
    <AccountContext.Provider
      value={{
        accounts,
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
