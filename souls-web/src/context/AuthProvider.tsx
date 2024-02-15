import React, { ReactElement, createContext, useState } from "react";
import { TUser } from "../Types/user";

const AuthContext = createContext<{
  auth: TUser | null;
  setAuth?: React.Dispatch<React.SetStateAction<TUser | null>>;
}>({ auth: null });

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [auth, setAuth] = useState<TUser | null>(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext as React.Context<{
  auth: TUser | null;
  setAuth: React.Dispatch<React.SetStateAction<TUser | null>>;
}>;
