import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const UseLogout = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
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
