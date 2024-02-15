import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Box,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, ChangeEvent, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

export const InputHour = ({
  valueH,
  setValueH,
  valueM,
  setValueM,
}: {
  valueH: string;
  setValueH: Dispatch<SetStateAction<string>>;
  valueM: string;
  setValueM: Dispatch<SetStateAction<string>>;
}) => {
  const hours = [
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
  ];
  const ampm = ["AM", "PM"];
  const [inputErrorH, setInputErrorH] = useState(false);
  const [inputErrorM, setInputErrorM] = useState(false);
  const handleInputChangeH = (e: ChangeEvent<HTMLSelectElement>) => {
    setValueH(e.target.value);
  };
  const handleInputChangeM = (e: ChangeEvent<HTMLSelectElement>) => {
    setValueM(e.target.value);
  };

  const checkInputOnBlurH = () => {
    if (!valueH) {
      setInputErrorH(true);
    }
  };
  const checkInputOnBlurM = () => {
    if (!valueM) {
      setInputErrorM(true);
    }
  };
  const eraseErrorH = () => {
    setInputErrorH(false);
  };
  const eraseErrorM = () => {
    setInputErrorM(false);
  };
  return (
    <Box display="flex" gap={2}>
      <FormControl isInvalid={inputErrorH} isRequired>
        <FormLabel htmlFor="meetT">Meet Time</FormLabel>
        <Select
          id="meetT"
          value={valueH}
          onChange={handleInputChangeH}
          isInvalid={inputErrorH}
          isRequired
          placeholder="Meet Time"
          onFocus={eraseErrorH}
          onBlur={checkInputOnBlurH}
          focusBorderColor="eden.50"
          errorBorderColor="red.300"
          icon={<MdArrowDropDown color="#768484" />}
        >
          {hours.map((hour, index) => (
            <option value={hour} key={index}>
              {hour}
            </option>
          ))}
        </Select>
        <FormErrorMessage>Hour required</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={inputErrorM} isRequired>
        <FormLabel htmlFor="ampm">AM/PM</FormLabel>
        <Select
          id="ampm"
          value={valueM}
          onChange={handleInputChangeM}
          isInvalid={inputErrorM}
          isRequired
          placeholder="AM or PM"
          onFocus={eraseErrorM}
          onBlur={checkInputOnBlurM}
          focusBorderColor="eden.50"
          errorBorderColor="red.300"
          icon={<MdArrowDropDown color="#768484" />}
        >
          {ampm.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </Select>
        <FormErrorMessage>Option required</FormErrorMessage>
      </FormControl>
    </Box>
  );
};
