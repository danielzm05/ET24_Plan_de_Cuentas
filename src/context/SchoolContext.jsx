import { createContext, useContext } from "react";
import { useState } from "react";
import { supabase } from "../backend/client";

export const SchoolContext = createContext();

export const useSchoolContext = () => {
  const context = useContext(SchoolContext);
  return context;
};
export const SchoolProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const { data: systemUsers, error } = await supabase
      .from("usuario")
      .select("*");
    if (error) throw error;

    setUsers(systemUsers);
  };

  return (
    <SchoolContext.Provider value={{ users, getUsers }}>
      {children}
    </SchoolContext.Provider>
  );
};
