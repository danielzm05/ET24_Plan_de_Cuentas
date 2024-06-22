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
      .select("id_cuenta, nombre, tipo_cuenta")
      .eq("id_user", user.user.id)
      .order("id_cuenta", { ascending: true });

    if (error) throw error;

    setAccounts(data);
  };
  return (
    <AccountContext.Provider value={{ accounts, getAccounts }}>
      {children}
    </AccountContext.Provider>
  );
};
