import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { PasswordField } from "../components/PasswordField";
import { InputField } from "../components/InputField";
import Logo from "../images/Logo.png";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import axios from "../api/axios";
import { TUser } from "../Types/user";
import useAuth from "../hooks/useAuth";
import { AxiosResponse } from "axios";

const LOGIN_URL: string = "/login";

const Login: React.FC = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  let timeoutId: any;
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/groups";

  useEffect(() => {
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let validEmail = pattern.test(email);

    if (validEmail && password && password.length >= 6) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

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
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  const loginController = async () => {
    setLoading(true);
    timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    try {
      const response: AxiosResponse = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setEmail("");
      setPassword("");
      const userAuth: TUser = response.data;
      setAuth(userAuth);
      navigate(from, { replace: true });
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
          title: err!.response!.data!.detail,
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
          {/* <MySVG /> */}
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading
              size={{ base: "xs", md: "sm" }}
              fontSize={32}
              color="shaft"
            >
              Log In to Your Account
            </Heading>
            <Text color="fg.muted">
              Don't have an account?{" "}
              <Link as={RouterLink} to="/register" variant="primary" size="sm">
                Register
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
                  title="Email"
                  type="email"
                  OptionIcon={MdEmail}
                  id="email"
                  value={email}
                  setValue={setEmail}
                  isRequired={true}
                />
                <PasswordField
                  title="Password"
                  id="password"
                  value={password}
                  setValue={setPassword}
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
                {/* <Link variant="primary" size="sm">
                  Forgot password?
                </Link> */}
              </HStack>
              <Stack spacing="6">
                <Button
                  variant="primary"
                  isDisabled={buttonDisabled}
                  isLoading={loading}
                  loadingText="Loading"
                  onClick={loginController}
                >
                  LOG IN
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
