import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PasswordField } from "../components/PasswordField";
import { InputField } from "../components/InputField";
import Logo from "../images/Logo.png";
import { Link as RouterLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import axios from "../api/axios";
const REGISTER_URL: string = "/register";

const Register: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confPassowrd, setConfPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  let timeoutId: any;

  useEffect(() => {
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phone_pattern = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    let validEmail = pattern.test(email);
    let validPhone = phone_pattern.test(phone);

    if (
      firstname &&
      lastname &&
      validEmail &&
      validPhone &&
      password &&
      password.length >= 8 &&
      password === confPassowrd &&
      organization
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [firstname, lastname, email, phone, password, confPassowrd, organization]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line
  }, []);

  const registerController = async () => {
    setLoading(true);
    timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          name: `${firstname} ${lastname}`,
          email: email,
          password: password,
          telephone: phone,
        }),
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );
      console.log(JSON.stringify(response));
    } catch (err: any) {
      if (!err!.response) {
        console.log(err!.message);
      } else if (err!.response!.data!.error!.email) {
        const message = err!.response!.data!.error!.email[0].split(" ");
        message.shift();
        const response = message.join(" ");
        console.log(response);
      } else {
        console.log(err!.response!.data!.error);
      }
    }

    console.log("form submitted");
    console.log(firstname, lastname, email, phone, password, organization);
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
              Register Your Organization
            </Heading>
            <Text color="fg.muted">
              Already have an account?{" "}
              <Link as={RouterLink} to="/login" variant="primary" size="sm">
                Login
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
                  title="Firstname"
                  type="text"
                  OptionIcon={FaUser}
                  id="firstname"
                  value={firstname}
                  setValue={setFirstname}
                  isRequired={true}
                />
                <InputField
                  title="Lastname"
                  type="text"
                  OptionIcon={FaUser}
                  id="lastname"
                  value={lastname}
                  setValue={setLastname}
                  isRequired={true}
                />
                <InputField
                  title="Email"
                  type="email"
                  OptionIcon={MdEmail}
                  id="email"
                  value={email}
                  setValue={setEmail}
                  isRequired={true}
                />
                <InputField
                  title="Phone Number"
                  type="tel"
                  OptionIcon={FaPhone}
                  id="phone"
                  value={phone}
                  setValue={setPhone}
                  isRequired={true}
                />
                <PasswordField
                  title="Password"
                  value={password}
                  id="password"
                  setValue={setPassword}
                />
                <PasswordField
                  title="Confirm Password"
                  value={confPassowrd}
                  id="confpassword"
                  setValue={setConfPassword}
                  prevValue={password}
                />
                <HStack>
                  <Divider color="eden.100" borderWidth="1px" />
                </HStack>
                <InputField
                  title="Organization's name"
                  type="text"
                  id="organization"
                  OptionIcon={RiOrganizationChart}
                  value={organization}
                  setValue={setOrganization}
                  isRequired={true}
                />
              </Stack>
              <Stack spacing="6">
                <Button
                  variant="primary"
                  isDisabled={buttonDisabled}
                  isLoading={loading}
                  loadingText="Registering"
                  onClick={registerController}
                >
                  REGISTER
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
