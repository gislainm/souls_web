import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useState,
} from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Tleader } from "../Types/user";

export const InputSelectLeaders = ({
  title,
  id,
  options,
  value,
  setValue,
  isRequired,
}: {
  title: string;
  id: string;
  options: Tleader[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isRequired: boolean;
}) => {
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const checkInputOnBlur = () => {
    if (!value) {
      setInputError(true);
      setErrorMessage(`Leader is required`);
    }
  };
  const eraseError = () => {
    setInputError(false);
    setErrorMessage("");
  };
  return (
    <FormControl isInvalid={inputError} isRequired={isRequired}>
      <FormLabel htmlFor={id}>{title}</FormLabel>
      <Select
        id={id}
        value={value}
        onChange={handleInputChange}
        isInvalid={inputError}
        isRequired={isRequired}
        placeholder="Leader"
        onFocus={eraseError}
        onBlur={checkInputOnBlur}
        focusBorderColor="eden.50"
        errorBorderColor="red.300"
        icon={<MdArrowDropDown color="#768484" />}
      >
        {options.map((leader, index) => (
          <option value={leader.id} key={index}>
            {leader.name}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
