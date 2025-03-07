import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

interface UsernameInputProps {
  control: any;
  errors: any;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ control, errors }) => {
  return (
    <FormControl isInvalid={!!errors.username} color="#003049">
      <FormLabel fontSize="14px">Username</FormLabel>
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
