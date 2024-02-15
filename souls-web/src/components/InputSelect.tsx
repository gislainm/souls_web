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
  useEffect,
} from "react";
import { MdArrowDropDown } from "react-icons/md";

export const InputSelect = ({
  title,
  id,
  options,
  value,
  setValue,
  isRequired,
}: {
  title: string;
  id: string;
  options: string[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isRequired: boolean;
}) => {
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leader, setLeader] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (id === "lselect") {
      setLeader(true);
    }
  }, [id]);

  const checkInputOnBlur = () => {
    if (!value) {
      setInputError(true);
      setErrorMessage(`${leader ? "Leader" : title}  is required`);
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
        placeholder={leader ? "Leader" : title}
        onFocus={eraseError}
        onBlur={checkInputOnBlur}
        focusBorderColor="eden.50"
        errorBorderColor="red.300"
        icon={<MdArrowDropDown color="#768484" />}
      >
        {options.map((day, index) => (
          <option value={day} key={index}>
            {day}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
