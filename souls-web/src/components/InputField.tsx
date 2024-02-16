import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, ChangeEvent, useState } from "react";
import { IconType } from "react-icons";

export const InputField = ({
  title,
  type,
  id,
  OptionIcon,
  value,
  setValue,
  isRequired,
}: {
  title: string;
  type: string;
  id: string;
  OptionIcon: IconType;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isRequired: boolean;
}) => {
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const code_pattern = /^[a-zA-Z0-9]{8}$/;
  const phone_pattern = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (id === "phone") {
      const input = e.target.value.replace(/\D/g, "");
      let formattedNumber = "";

      if (input.length > 0) {
        formattedNumber = "(" + input.slice(0, 3);
        if (input.length > 3) {
          formattedNumber += ") " + input.slice(3, 6);
          if (input.length > 6) {
            formattedNumber += "-" + input.slice(6, 10);
          }
        }
      }
      setValue(formattedNumber);
    } else {
      setValue(e.target.value);
    }
  };
  const checkInputOnBlur = () => {
    if (!value) {
      setInputError(true);
      setErrorMessage(`${title}  is required`);
    } else if (type === "email") {
      let email_validity = email_pattern.test(value);

      if (!email_validity) {
        setInputError(true);
        setErrorMessage("Valid email (example@example.com) is required");
      }
    } else if (id === "access") {
      let code_validity = code_pattern.test(value);
      if (!code_validity) {
        setInputError(true);
        setErrorMessage("Valid code is required");
      }
    } else if (id === "phone") {
      let phone_validity = phone_pattern.test(value);
      if (!phone_validity) {
        setInputError(true);
        setErrorMessage("Valid phone number '(123) 456-7890' is required");
      }
    }
  };
  const eraseError = () => {
    setInputError(false);
    setErrorMessage("");
  };
  return (
    <FormControl isInvalid={inputError} isRequired={isRequired}>
      <FormLabel htmlFor={id}>{title}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <OptionIcon color="#768484" />
        </InputLeftElement>
        <Input
          id={id}
          type={type}
          value={value}
          autoComplete={id}
          onChange={handleInputChange}
          onFocus={eraseError}
          onBlur={checkInputOnBlur}
          focusBorderColor="eden.50"
          isInvalid={inputError}
          errorBorderColor="red.300"
        />
      </InputGroup>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
