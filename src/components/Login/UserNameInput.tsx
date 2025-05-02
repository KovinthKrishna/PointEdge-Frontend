import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Controller, Control, FieldErrors } from "react-hook-form";

interface LoginFormInputs {
  username: string;
  password: string;
}

interface UsernameInputProps {
  control: Control<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ control, errors }) => {
  return (
    <FormControl isInvalid={!!errors.username} color="#003049">
      <FormLabel fontSize="14px">Email</FormLabel>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} borderWidth="2px" />}
      />
      <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default UsernameInput;
