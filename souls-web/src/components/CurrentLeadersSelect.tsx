import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";
import { InputSelectLeaders } from "./InputSelectLeaders";
import { Tleader } from "../Types/user";

const CurrentLeaderSelect = ({
  activateNewLeader,
  leaders,
  chosenLeader,
  setChosenLeader,
}: {
  activateNewLeader: Dispatch<SetStateAction<boolean>>;
  leaders: Tleader[];
  chosenLeader: string;
  setChosenLeader: Dispatch<SetStateAction<string>>;
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
        Choose Group Leader
      </Text>
      <Stack spacing="1">
        <InputSelectLeaders
          title="Choose Leader"
          id="lselect"
          options={leaders}
          value={chosenLeader}
          setValue={setChosenLeader}
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
            activateNewLeader(true);
          }}
        >
          Add New Leader
        </Button>
      </Center>
    </Box>
  );
};

export default CurrentLeaderSelect;
