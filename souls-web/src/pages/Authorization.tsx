import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Checkbox,
  Link,
  Stack,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import Logo from "../images/Logo.png";
import axios from "../api/axios";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { TbLockAccess } from "react-icons/tb";
import { AxiosResponse } from "axios";
import { TLeaderUser } from "../Types/user";
import useAuthL from "../hooks/useAuthLeader";

const Authorization: React.FC = () => {
  const { setAuth, persist, setPersist } = useAuthL();
  const toast = useToast();
  const [accessCode, setAccessCode] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { uuid } = useParams();
  const AUTH_URL: string = `/oauth/verify/${uuid}`;
  let timeoutId: any;

  useEffect(() => {
    const initialPersist = localStorage.getItem("persist");
    if (initialPersist) {
      setPersist(JSON.parse(initialPersist));
    }
    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const pattern = /^[a-zA-Z0-9]{8}$/;
    const validCode = pattern.test(accessCode);
    if (validCode) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [accessCode]);
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  const verifyController = async () => {
    setLoading(true);
    timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    try {
      const response: AxiosResponse = await axios.post(
        AUTH_URL,
        JSON.stringify({ code: accessCode }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const userAuth: TLeaderUser = response.data;
      const nextPage: string = `/${userAuth.organization.id}/groups`;
      setAuth(userAuth);
      navigate(nextPage, { replace: true });
    } catch (err: any) {
      if (!err!.response) {
        toast({
          title: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else if (err!.response!.data) {
        toast({
          title: err!.response!.data!.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
      display="flex"
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Image src={Logo} alt="Logo" />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading
              size={{ base: "xs", md: "sm" }}
              fontSize={32}
              color="shaft"
            >
              Verify Your Access Code
            </Heading>
            <Text color="fg.muted">
              Request{" "}
              <Link as={RouterLink} to="/login" variant="primary" size="sm">
                Access Code
              </Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <form>
            <Stack spacing="6">
              <Stack spacing="5">
                <InputField
                  title="Access Code"
                  type="text"
                  OptionIcon={TbLockAccess}
                  id="access"
                  value={accessCode}
                  setValue={setAccessCode}
                  isRequired={true}
                />
              </Stack>
              <HStack justify="space-between">
                <Checkbox
                  colorScheme="teal"
                  borderColor="eden.100"
                  isChecked={persist}
                  onChange={togglePersist}
                >
                  Remember me
                </Checkbox>
              </HStack>
              <Stack spacing="6">
                <Button
                  variant="primary"
                  isDisabled={buttonDisabled}
                  isLoading={loading}
                  loadingText="Loading"
                  onClick={verifyController}
                >
                  Verify
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Authorization;
