import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { FaCalendarAlt } from "react-icons/fa";
import { MemberBox } from "../components/MemberBox";
import { TAttending } from "../Types/user";
import AttendingUserModal from "../components/AttendingUserModal";
import { AxiosResponse } from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const RecordAttendance: React.FC = () => {
  const location = useLocation();
  const group_id: string = location.state.group_id;
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();
  const now = new Date();
  const date = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const year = now.getFullYear();
  const [dateValue, setDateValue] = useState(`${year}-${month}-${date}`);
  const [present, setPresent] = useState<string[]>([]);
  const [members, setMembers] = useState<TAttending[]>([]);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    let isMounted = true;
    const apiController = new AbortController();
    const fetchGroupMembers = async () => {
      try {
        const response: AxiosResponse = await axiosPrivate.get(
          `group/${group_id}/get-members`,
          {
            signal: apiController.signal,
          }
        );
        isMounted && setMembers(response.data?.members);
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
    fetchGroupMembers();
    return () => {
      isMounted = false;
      apiController.abort();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (present.length > 0) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }, [present]);

  const handleSave = async () => {
    const reqBody = {
      meeting_date: dateValue,
      members_present: present,
    };
    try {
      const response: AxiosResponse = await axiosPrivate.post(
        `group/${group_id}/record-attendance`,
        JSON.stringify(reqBody)
      );
      if (response.data.error) {
        toast({
          title: response.data.error,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
      setPresent([]);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setPresent([]);
    }
  };

  const handleNoMeet = async () => {
    const reqBody = {
      meeting_date: dateValue,
      members_present: [],
    };
    try {
      const response: AxiosResponse = await axiosPrivate.post(
        `group/${group_id}/record-attendance`,
        JSON.stringify(reqBody)
      );
      if (response.data.error) {
        toast({
          title: response.data.error,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Information Saved Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
      setPresent([]);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setPresent([]);
    }
  };

  return (
    <Container
      display="flex"
      justifyContent="center"
      className="mt-32 pt-6 pb-12 mx-auto px-4 sm:px-6"
    >
      <Stack spacing="8">
        <Stack
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="sirocco">
            <InputField
              title="Meeting Date"
              type="date"
              id="date"
              OptionIcon={FaCalendarAlt}
              value={dateValue}
              setValue={setDateValue}
              isRequired={false}
            />
          </Box>
          <Button variant="start" onClick={onOpen}>
            Add Member
          </Button>
        </Stack>
        <Box
          marginTop="7"
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="5" width={{ sm: 350, base: 250 }}>
            {members.length > 0 &&
              members.map((member, index) => {
                return (
                  <MemberBox
                    key={index}
                    id={member.id}
                    name={member.name}
                    present={present}
                    setPresent={setPresent}
                  />
                );
              })}
            {members.length === 0 && (
              <Text textAlign="center">No members in this group</Text>
            )}
          </Stack>
        </Box>
        <Center>
          <Button
            variant="primary"
            paddingX={10}
            onClick={handleSave}
            isDisabled={saveDisabled}
          >
            Save Attendance
          </Button>
        </Center>
        <Center>
          <Button
            variant="group"
            paddingX={10}
            onClick={handleNoMeet}
            isDisabled={!saveDisabled}
          >
            We Didn't Meet
          </Button>
        </Center>
      </Stack>
      <AttendingUserModal
        isOpen={isOpen}
        onClose={onClose}
        groupId={group_id}
        setMembers={setMembers}
      />
    </Container>
  );
};

export default RecordAttendance;
