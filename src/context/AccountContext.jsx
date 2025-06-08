import { useContext, createContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { supabase } from "../backend/client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AccountContext = createContext();

export const useAccounts = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [modifications, setModifications] = useState([]);
  const { user, userInfo, getUserInfo } = useAuthContext();
  const navigate = useNavigate();

  const getModifications = async (studentId) => {
    if (studentId) {
      const { data, error } = await supabase.from("modificacion").select("*").eq("id_usuario", studentId).order("fecha", { ascending: false });

      if (error) throw error;
      setModifications(data);
    }
  };

  const deleteModifications = async (studentId) => {
    if (studentId) {
      const { error } = await supabase.from("modificacion").delete().eq("id_usuario", studentId);
      if (error) throw error;
      getModifications(studentId);
      toast.success("Modificaciones Eliminadas");
    }
  };

  const createModification = async (descripcion) => {
    if (userInfo.id_rol === 3 || userInfo.id_rol === 1) {
      const { error } = await supabase.from("modificacion").insert([{ descripcion: descripcion, id_usuario: user.id }]);
      if (error) throw error;
      getModifications();
    }
  };

  const getAccounts = async (id = user.id) => {
    const { data, error } = await supabase
      .from("cuenta")
      .select("id_cuenta, codigo, nombre, tipo_cuenta")
      .eq("id_usuario", id)
      .order("codigo", { ascending: true });

    if (error) throw error;

    setAccounts(data);
  };

  const createAccount = async (codigo, nombre, tipo) => {
    const { error } = await supabase.from("cuenta").insert([
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
    toast.success(`${nombre} creado con éxito`);
  };

  const deleteAccount = async (id, nombre) => {
    const { error } = await supabase.from("cuenta").delete().eq("id_cuenta", id).eq("id_usuario", user.id);

    if (error) throw error;
    getAccounts();
    createModification(`Eliminó ${nombre}`);
    toast.success(`${nombre} eliminado con éxito`);
  };

  const updateAccount = async (id, codigo, nombre, tipo = "", cuenta) => {
    const { error } = await supabase
      .from("cuenta")
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
    toast.success(`Cuenta modificada con éxito`);
  };

  const updateCompanyName = async (newCompanyName, id = user.id) => {
    const { error } = await supabase
      .from("usuario")
      .update({
        empresa: newCompanyName,
      })
      .eq("id_usuario", id);

    if (error) throw error;
    getUserInfo();
    navigate("/cuentas");
    toast.success(`Nombre de empresa actualizado`);
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
        updateCompanyName,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
