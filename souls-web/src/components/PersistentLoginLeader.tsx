import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshTokenLeader from "../hooks/useRefreshTokenLeader";
import useAuthL from "../hooks/useAuthLeader";
import { Spinner, AbsoluteCenter, Box, useToast } from "@chakra-ui/react";

const PersistentLoginLeader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refresh = useRefreshTokenLeader();
  const { auth, persist } = useAuthL();
  const toast = useToast();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error: any) {
        toast({
          title: error!.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    !auth ? verifyRefreshToken() : setIsLoading(false);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <Box minHeight="100vh">
          <AbsoluteCenter>
            <Spinner
              thickness="6px"
              emptyColor="#fff"
              color="#155454"
              size="xl"
            />
          </AbsoluteCenter>
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistentLoginLeader;
