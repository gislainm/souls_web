import useAuthL from "./useAuthLeader";
import useAxiosPrivateLeader from "./useAxiosPrivateLeader";

const UseLogout = () => {
  const axiosPrivate = useAxiosPrivateLeader();
  const { setAuth } = useAuthL();
  const logout = async () => {
    try {
      const response = await axiosPrivate.post("logout");
      setAuth(null);
      return response;
    } catch (error: any) {
      return error;
    }
  };
  return logout;
};

export default UseLogout;
