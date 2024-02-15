import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Spacer,
  Box,
  useToast,
} from "@chakra-ui/react";
import { InputField } from "./InputField";
import { MdGroupAdd } from "react-icons/md";
import { InputSelect } from "./InputSelect";
import { InputHour } from "./InputHour";
import NewLeaderForm from "./NewLeaderForm";
import CurrentLeaderSelect from "./CurrentLeadersSelect";
import { Tleader } from "../Types/user";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { AxiosResponse } from "axios";
import useAuth from "../hooks/useAuth";
import { TGroup } from "../Types/group";

const FormModal = ({
  isOpen,
  onClose,
  Mode,
  leaders,
  setLeaders,
  setGroups,
}: {
  isOpen: boolean;
  onClose: () => void;
  Mode: string;
  leaders: Tleader[];
  setLeaders: Dispatch<SetStateAction<Tleader[]>>;
  setGroups: Dispatch<SetStateAction<TGroup[]>>;
}) => {
  const [name, setName] = useState("");
  const [meetD, setMeetD] = useState("");
  const [meetH, setMeetH] = useState("");
  const [meetM, setMeetM] = useState("");
  const [chosenLeader, setChosenLeader] = useState<string>("");
  const [newLName, setnewLName] = useState<string>("");
  const [newLEmail, setnewLEmail] = useState<string>("");
  const [newLPhone, setnewLPhone] = useState<string>("");

  const [addLeader, setAddLeader] = useState(false);
  const [newLeader, setNewLeader] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const toast = useToast();
  const axiosPrivate = useAxiosPrivate();
  const apiController = new AbortController();
  const { auth } = useAuth();

  const activateAddingNewLeader = () => {
    setAddLeader(true);
    setNewLeader(true);
  };
  const activateAddingCurrentLeader = () => {
    setAddLeader(true);
    setNewLeader(false);
  };
  const formCleanUp = () => {
    setName("");
    setMeetD("");
    setMeetH("");
    setMeetM("");
    setChosenLeader("");
    setnewLName("");
    setnewLEmail("");
    setnewLPhone("");
    setAddLeader(false);
    setNewLeader(false);
  };

  const customClose = () => {
    onClose();
    formCleanUp();
    apiController.abort();
  };

  const handleSave = async () => {
    let meetHour;
    if (meetM === "AM" && meetH === "12:00") {
      meetHour = "00:00";
    } else if (meetM === "AM" || (meetM === "PM" && meetH === "12:00")) {
      meetHour = meetH;
    } else {
      let meetStr = meetH.split(":")[0];
      let meetNum = Number(meetStr) + 12;
      meetHour = `${meetNum}:00`;
    }
    if (newLeader) {
      const reqBody = {
        group_leader: {
          name: newLName,
          email: newLEmail,
          telephone: newLPhone,
        },
        small_group: {
          name: name,
          meet_day: meetD,
          meet_time: meetHour,
        },
      };
      try {
        const response: AxiosResponse = await axiosPrivate.post(
          `organization/${auth?.organization.id}/add-small-group`,
          JSON.stringify(reqBody),
          {
            signal: apiController.signal,
          }
        );
        setGroups((prevState: TGroup[]) => [
          ...prevState,
          response.data.small_group,
        ]);
        setLeaders((prevState: Tleader[]) => [
          ...prevState,
          response.data.small_group.leader,
        ]);
        formCleanUp();
        toast({
          title: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } catch (error: any) {
        if (error.response.data.error.email) {
          toast({
            title: "Leader with this email already saved",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        } else {
          toast({
            title: error.response ? error.response.data.error : error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      }
    } else {
      const reqBody = {
        group_leader: {
          id: chosenLeader,
        },
        small_group: {
          name: name,
          meet_day: meetD,
          meet_time: meetHour,
        },
      };
      try {
        const response: AxiosResponse = await axiosPrivate.post(
          `organization/${auth?.organization.id}/add-small-group-eleader`,
          JSON.stringify(reqBody),
          {
            signal: apiController.signal,
          }
        );
        setGroups((prevState: TGroup[]) => [
          ...prevState,
          response.data.small_group,
        ]);
        formCleanUp();
        toast({
          title: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      } catch (error: any) {
        toast({
          title: error.response ? error.response.data.error : error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  useEffect(() => {
    if (newLeader) {
      setChosenLeader("");
    }
    if (!newLeader) {
      setnewLName("");
      setnewLEmail("");
      setnewLPhone("");
    }
  }, [newLeader]);
  useEffect(() => {
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phone_pattern = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    let validEmail = pattern.test(newLEmail);
    let validPhone = phone_pattern.test(newLPhone);
    if (newLeader) {
      if (
        validEmail &&
        validPhone &&
        name &&
        meetD &&
        meetH &&
        meetM &&
        newLName &&
        newLEmail &&
        newLPhone
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    } else if (!newLeader) {
      if (name && meetD && meetH && meetM && chosenLeader) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    } else {
      setButtonDisabled(true);
    }
  }, [
    name,
    meetD,
    meetH,
    meetM,
    chosenLeader,
    newLName,
    newLEmail,
    newLPhone,
    newLeader,
  ]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={customClose}
        isCentered
        scrollBehavior="inside"
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(2px) hue-rotate(7deg)"
        />
        <ModalContent>
          <ModalHeader>{`${Mode} Group`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <InputField
              title="Group Name"
              type="text"
              OptionIcon={MdGroupAdd}
              id="gname"
              value={name}
              setValue={setName}
              isRequired={true}
            />
            <InputSelect
              title="Meet Day"
              id="meetday"
              isRequired={true}
              value={meetD}
              setValue={setMeetD}
              options={[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ]}
            />
            <InputHour
              valueH={meetH}
              setValueH={setMeetH}
              valueM={meetM}
              setValueM={setMeetM}
            />
            {!addLeader && (
              <Flex
                minWidth="max-content"
                alignItems="center"
                gap="2"
                marginY={4}
              >
                <Button
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
                  onClick={activateAddingNewLeader}
                >
                  New Leader
                </Button>
                <Spacer />
                <Box textAlign="center">OR</Box>
                <Spacer />
                <Button
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
                  onClick={activateAddingCurrentLeader}
                >
                  Current Leader
                </Button>
              </Flex>
            )}
            {addLeader && newLeader && (
              <NewLeaderForm
                activate={setNewLeader}
                lName={newLName}
                setLName={setnewLName}
                lEmail={newLEmail}
                setLEmail={setnewLEmail}
                lPhone={newLPhone}
                setLPhone={setnewLPhone}
              />
            )}
            {addLeader && !newLeader && (
              <CurrentLeaderSelect
                activateNewLeader={setNewLeader}
                leaders={leaders}
                chosenLeader={chosenLeader}
                setChosenLeader={setChosenLeader}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="group"
              isDisabled={buttonDisabled}
              mr={3}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="ghost"
              color="slate.70"
              borderColor="slate.70"
              borderWidth="1px"
              borderRadius="md"
              _hover={{
                bg: "eden.50",
                color: "background",
                transform: "scale(1.02)",
              }}
              onClick={customClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormModal;
