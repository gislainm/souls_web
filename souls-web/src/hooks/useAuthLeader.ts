import { useContext } from "react";
import AuthContextL from "../context/AuthProviderLeader";

const useAuthL = () => {
  return useContext(AuthContextL);
};

export default useAuthL;
