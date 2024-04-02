import { TLeaderUser } from "../Types/user";
import axios from "../api/axios";
import useAuthL from "./useAuthLeader";
import { useNavigate } from "react-router-dom";

const useRefreshTokenLeader = () => {
  const { setAuth } = useAuthL();
  const navigate = useNavigate();
  const refresh = async () => {
    try {
      const response = await axios.post(
        "/api/token/refresh",
        {},
        { withCredentials: true }
      );
      setAuth((prevState: TLeaderUser | null) => {
        if (prevState !== null) {
          return { ...prevState, access: response.data.access };
        } else {
          return response.data;
        }
      });
      return response.data.access;
    } catch (error) {
      console.log(error);
      setAuth(null);
      navigate("/");
      return error;
    }
  };
  return refresh;
};

export default useRefreshTokenLeader;
