import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

const NewLeaderForm = ({
  activate,
  lName,
  setLName,
  lEmail,
  setLEmail,
  lPhone,
  setLPhone,
}: {
  activate: Dispatch<SetStateAction<boolean>>;
  lName: string;
  setLName: Dispatch<SetStateAction<string>>;
  lEmail: string;
  setLEmail: Dispatch<SetStateAction<string>>;
  lPhone: string;
  setLPhone: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Box
      borderWidth="1px"
      padding={2}
      borderColor="table.100"
      borderRadius="md"
      marginY={2}
    >
      <Text color="sark" fontWeight={600} paddingBottom={2} textAlign="center">
        Group Leader Information
      </Text>
      <Stack spacing="1">
        <InputField
          title="Leader Name"
          type="text"
          OptionIcon={FaUser}
          id="lname"
          value={lName}
          setValue={setLName}
          isRequired={true}
        />
        <InputField
          title="Leader Email"
          type="email"
          OptionIcon={MdEmail}
          id="email"
          value={lEmail}
          setValue={setLEmail}
          isRequired={true}
        />
        <InputField
          title="Phone Number"
          type="tel"
          OptionIcon={FaPhone}
          id="phone"
          value={lPhone}
          setValue={setLPhone}
          isRequired={true}
        />
      </Stack>
      <Center>
        <Button
          marginY={2}
          variant="ghost"
          color="sark"
          borderColor="sark"
          borderWidth="1px"
          borderRadius="md"
          _hover={{
            bg: "sark",
            color: "background",
            transform: "scale(1.02)",
          }}
          onClick={() => {
            activate(false);
          }}
        >
          Choose From Current Leaders
        </Button>
      </Center>
    </Box>
  );
};

export default NewLeaderForm;
