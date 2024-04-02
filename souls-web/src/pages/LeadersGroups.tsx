import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import useAuthL from "../hooks/useAuthLeader";

const LeaderGroups: React.FC = () => {
  const { auth } = useAuthL();
  const navigate = useNavigate();
  const [groups, setGroups] = useState<{ id: string; name: string }[] | null>(
    null
  );
  useEffect(() => {
    if (auth!.groups.length > 0) {
      setGroups(auth!.groups);
    }
    // eslint-disable-next-line
  }, []);
  const goToGroup = (group_id: string, name: string) => {
    navigate(`/${auth!.organization.id}/group/${name}`, {
      state: { group_id,name },
    });
  };
  return (
    <Container
      display="flex"
      justifyContent="center"
      className="mt-32 pt-6 pb-12 mx-auto px-4 sm:px-6"
    >
      <Stack spacing="8">
        <Stack textAlign="center">
          <Heading
            size={{ base: "xs", md: "sm" }}
            fontSize={28}
            color="sirocco"
          >
            Your Groups
          </Heading>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="5" width={{ sm: 350, base: 250 }}>
            {groups &&
              groups.map((item, index) => {
                return (
                  <Button
                    variant="group"
                    key={index}
                    onClick={() => goToGroup(item.id, item.name)}
                  >
                    {item.name}
                  </Button>
                );
              })}
            {!groups && <Text color="fg.muted">You have no groups</Text>}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default LeaderGroups;
