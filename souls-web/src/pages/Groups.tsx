import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  Container,
  useToast,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Tbody,
  Th,
  Button,
  Heading,
} from "@chakra-ui/react";
import { TGroup } from "../Types/group";
import useAuth from "../hooks/useAuth";
import { AxiosResponse } from "axios";
import TableRow from "../components/TableRow";
import { MdGroupAdd } from "react-icons/md";
import FormModal from "../components/Modal";
import { Tleader } from "../Types/user";

function Groups() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [groups, setGroups] = useState<TGroup[]>([]);
  const [groupLeaders, setGroupLeaders] = useState<Tleader[]>([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    let isMounted = true;
    const apiController = new AbortController();
    const fetchGroups = async () => {
      try {
        const response: AxiosResponse = await axiosPrivate.get(
          `organization/${auth?.organization.id}/get-groups`,
          {
            signal: apiController.signal,
          }
        );
        isMounted && setGroups(response.data?.groups);
      } catch (error: any) {
        if (error.message !== "canceled") {
          toast({
            title: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      }
    };
    const fetchLeaders = async () => {
      try {
        const response: AxiosResponse = await axiosPrivate.get(
          `organization/${auth?.organization.id}/get-leaders`,
          {
            signal: apiController.signal,
          }
        );
        isMounted && setGroupLeaders(response.data?.leaders);
      } catch (error: any) {
        if (error.message !== "canceled") {
          toast({
            title: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      }
    };
    fetchGroups();
    fetchLeaders();
    return () => {
      isMounted = false;
      apiController.abort();
    };
    // eslint-disable-next-line
  }, []);
  return (
    <Container maxW="6xl">
      {groups.length > 0 && (
        <TableContainer
          className="mt-32 pt-6 pb-12 mx-auto px-4 sm:px-6"
          borderWidth="2px"
          borderRadius="md"
          borderColor="table.100"
        >
          <Table variant="striped" colorScheme="table" size="sm">
            <TableCaption placement="top">
              <Heading color="browner">{`${auth?.organization.name} Groups`}</Heading>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Leader</Th>
                <Th>Meet Day</Th>
                <Th>Meet Time</Th>
                <Th>Edit Group</Th>
              </Tr>
            </Thead>
            <Tbody>
              {groups.map((group, index) => (
                <TableRow group={group} key={index} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {!(groups.length > 0) && (
        <div className="relative max-w-6xl  pt-20 mx-auto px-6">
          <div className="pt-12 md:pt-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-[#115554] mb-4">
                You have no groups in your organization yet.
              </h2>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-xs mx-auto my-4 flex justify-center">
        <Button variant="group" rightIcon={<MdGroupAdd />} onClick={onOpen}>
          Add Group
        </Button>
      </div>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        Mode="Add"
        leaders={groupLeaders}
        setLeaders={setGroupLeaders}
        setGroups={setGroups}
      />
    </Container>
  );
}

export default Groups;
