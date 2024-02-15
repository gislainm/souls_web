import React from "react";
import { Tr, Td, Button } from "@chakra-ui/react";
import { TGroup } from "../Types/group";

const TableRow = ({ group }: { group: TGroup }) => {
  return (
    <Tr>
      <Td>{group.name}</Td>
      <Td>{group.leader.name}</Td>
      <Td>{group.meet_day}</Td>
      <Td>{group.meet_time}</Td>
      <Td>
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
