import React, { ReactElement, createContext, useState } from "react";
import { TUser } from "../Types/user";

const AuthContext = createContext<{
  auth: TUser | null;
  setAuth?: React.Dispatch<React.SetStateAction<TUser | null>>;
  persist: boolean;
  setPersist?: React.Dispatch<React.SetStateAction<boolean>>;
}>({ auth: null, persist: false });

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [auth, setAuth] = useState<TUser | null>(null);
  const localPersit: string | null = localStorage.getItem("persist");
  const initialPesist: boolean = localPersit ? JSON.parse(localPersit) : false;
  const [persist, setPersist] = useState<boolean>(initialPesist);
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext as React.Context<{
  auth: TUser | null;
  setAuth: React.Dispatch<React.SetStateAction<TUser | null>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}>;
