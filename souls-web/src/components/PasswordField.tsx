import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { FaUserLock } from "react-icons/fa6";
import { HiEye, HiEyeOff } from "react-icons/hi";

export const PasswordField = ({
  title,
  id,
  value,
  setValue,
  prevValue,
}: {
  title: string;
  id: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  prevValue?: string;
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const checkInputOnBlur = () => {
    if (
      (title === "Password" && value === "") ||
      (title === "Password" && value.length < 8)
    ) {
      setInputError(true);
      setErrorMessage(`Password must be 8 characters or more`);
    } else if (title === "Confirm Password" && value !== prevValue) {
      setInputError(true);
      setErrorMessage(`Password doesn't match`);
    } else if (title === "Confirm Password" && value.length < 8) {
      setInputError(true);
      setErrorMessage(`Password must be 8 characters or more`);
    } else {
      setInputError(false);
      setErrorMessage("");
    }
  };

  const onFocusController = () => {
    setInputError(false);
    setErrorMessage("");
  };

  const onClickReveal = () => {
    onToggle();
  };

  return (
    <FormControl isRequired isInvalid={inputError}>
      <FormLabel htmlFor="password">{title}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="text"
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <InputLeftElement pointerEvents="none">
          <FaUserLock color="#768484" />
        </InputLeftElement>
        <Input
          name="password"
          id={id}
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          focusBorderColor="eden.50"
          onChange={handleInputChange}
          onFocus={onFocusController}
          onBlur={checkInputOnBlur}
          isInvalid={inputError}
        />
      </InputGroup>
      <FormErrorMessage>{errorMessage}.</FormErrorMessage>
    </FormControl>
  );
};

PasswordField.displayName = "PasswordField";
