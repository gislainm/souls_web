import { TUser } from "../Types/user";
import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const refresh = async () => {
    try {
      const response = await axios.post(
        "/api/token/refresh",
        {},
        { withCredentials: true }
      );
      setAuth((prevState: TUser | null) => {
        if (prevState !== null) {
          return { ...prevState, access: response.data.access };
        } else {
          return response.data;
        }
      });
      return response.data.access;
    } catch (error) {
      setAuth(null);
      navigate("/login");
      return error;
    }
  };
  return refresh;
};

export default useRefreshToken;
