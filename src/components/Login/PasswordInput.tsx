import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface PasswordInputProps {
  control: any;
  errors: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ control, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={!!errors.password} color="#003049">
      <FormLabel fontSize="14px">Password</FormLabel>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup>
            <Input
              {...field}
              type={showPassword ? "text" : "password"}
              borderWidth="2px"
              sx={{
                // Removes the browser's default password visibility icon
                "&::-ms-reveal": { display: "none" },
                "&::-webkit-contacts-auto-fill-button": { display: "none" },
                "&::-webkit-credentials-auto-fill-button": { display: "none" },
              }}
            />
            <InputRightElement>
              <IconButton
                size="sm"
                aria-label="Toggle Password Visibility"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword((prev) => !prev)}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        )}
      />
      <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordInput;
