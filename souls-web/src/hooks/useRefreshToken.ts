import { TUser } from "../Types/user";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.post(
      "/api/token/refresh",
      {},
      { withCredentials: true }
    );
    setAuth((prevState: TUser | null) => {
      if (prevState !== null) {
        return { ...prevState, access: response.data.access };
      } else {
        return null;
      }
    });
    return response.data.access;
  };
  return refresh;
};

export default useRefreshToken;
