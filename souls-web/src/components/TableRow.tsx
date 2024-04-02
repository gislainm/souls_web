import React from "react";
import { Tr, Td, Button } from "@chakra-ui/react";
import { TGroup } from "../Types/group";

const TableRow = ({ group }: { group: TGroup }) => {
  return (
    <Tr>
      <Td fontSize={14}>{group.name}</Td>
      <Td fontSize={14}>{group.leader.name}</Td>
      <Td fontSize={14}>{group.meet_day}</Td>
      <Td fontSize={14}>{group.meet_time}</Td>
      <Td fontSize={14}>
        <Button
          variant="ghost"
          as="span"
          color="browner"
          borderColor="scorpion"
          borderWidth="1px"
          borderRadius="md"
          size="xs"
          isDisabled={true}
          _hover={{
            bg: "browner",
            color: "background",
          }}
        >
          Edit
        </Button>
      </Td>
    </Tr>
  );
};

export default TableRow;
