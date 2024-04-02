import React, { ReactElement, createContext, useState } from "react";
import { TLeaderUser } from "../Types/user";

const AuthContextL = createContext<{
  auth: TLeaderUser | null;
  setAuth?: React.Dispatch<React.SetStateAction<TLeaderUser | null>>;
  persist: boolean;
  setPersist?: React.Dispatch<React.SetStateAction<boolean>>;
}>({ auth: null, persist: false });

export const AuthProviderLeader = ({ children }: { children: ReactElement }) => {
  const [auth, setAuth] = useState<TLeaderUser | null>(null);
  const localPersist: string | null = localStorage.getItem("persist");
  const initialPersist: boolean = localPersist ? JSON.parse(localPersist) : false;
  const [persist, setPersist] = useState<boolean>(initialPersist);
  return (
    <AuthContextL.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContextL.Provider>
  );
};

export default AuthContextL as React.Context<{
  auth: TLeaderUser | null;
  setAuth: React.Dispatch<React.SetStateAction<TLeaderUser | null>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}>;
