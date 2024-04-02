import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { InputField } from "./InputField";
import { HiUserAdd } from "react-icons/hi";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { AxiosResponse } from "axios";
import { TAttending } from "../Types/user";

const AttendingUserModal = ({
  isOpen,
  onClose,
  groupId,
  setMembers,
}: {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  setMembers: React.Dispatch<React.SetStateAction<TAttending[]>>;
}) => {
  const [name, setName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const toast = useToast();
  const axiosPrivate = useAxiosPrivate();
  const apiController = new AbortController();

  const formCleanUp = () => {
    setName("");
  };

  const customClose = () => {
    onClose();
    formCleanUp();
    apiController.abort();
  };

  const handleSave = async () => {
    const reqBody = {
      name,
    };
    try {
      const response: AxiosResponse = await axiosPrivate.post(
        `group/${groupId}/add-member`,
        JSON.stringify(reqBody),
        {
          signal: apiController.signal,
        }
      );
      setMembers(response?.data.small_group.members);
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
  };

  useEffect(() => {
    if (name) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name]);

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
          <ModalHeader>Add Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <InputField
              title="Member Name"
              type="text"
              OptionIcon={HiUserAdd}
              id="member-name"
              value={name}
              setValue={setName}
              isRequired={true}
            />
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

export default AttendingUserModal;
