import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
//   Link,
  Stack,
//   Text,
} from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import Logo from "../images/Logo.png";
// import { Link as RouterLink } from "react-router-dom";
import { TbLockAccess } from "react-icons/tb";

const Authorization: React.FC = () => {
  const [accessCode, setAccessCode] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  let timeoutId: any;

  useEffect(() => {
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
    }else{
        setButtonDisabled(true);
    }
  }, [accessCode]);

  const verifyController = () => {
    setLoading(true);
    timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);
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
