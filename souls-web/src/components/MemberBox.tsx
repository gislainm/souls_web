import { Box, Text, Center } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";

export const MemberBox = ({
  id,
  name,
  present,
  setPresent,
}: {
  id: string;
  name: string;
  present: string[];
  setPresent: Dispatch<SetStateAction<string[]>>;
}) => {
  useEffect(() => {
    if (present.includes(id)) {
      setActive(true);
    } else {
      setActive(false);
    }
    //eslint-disable-next-line
  }, [present]);
  const [active, setActive] = useState<boolean>(false);
  const presentController = () => {
    setActive(!active);
    if (present.includes(id)) {
      setPresent((prev) => prev.filter((itemid) => itemid !== id));
    } else {
      setPresent((prev) => [...prev, id]);
    }
  };
  return (
    <Box
      onClick={presentController}
      borderWidth="1px"
      borderRadius="md"
      padding={2}
      paddingX={active ? 6 : 2}
      borderColor="sirocco"
      textAlign="center"
      backgroundColor={active ? "sirocco" : "background"}
      color={active ? "Background" : "text"}
      cursor="pointer"
      fontSize={18}
      display="flex"
      justifyContent={active ? "space-between" : "center"}
    >
      <Text textAlign="center">{name}</Text>
      {active && (
        <Center>
          <IoMdCheckmarkCircle color="#155454" />
        </Center>
      )}
    </Box>
  );
};
