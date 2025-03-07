import { Box, VStack } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UsernameInput from "./UserNameInput";
import PasswordInput from "./PasswordInput";
import ForgotPassword from "./ForgotPassword";
import LoginButton from "./LoginButton";

// Validation schema using Yup
const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Must be 6 characters"),
});

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Login Data:", data);
  };

  const handleForgotPassword = () => {
    alert("Redirect to Forgot Password Page!");
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <UsernameInput control={control} errors={errors} />
        <PasswordInput control={control} errors={errors} />
        <ForgotPassword onForgotPassword={handleForgotPassword} />
        <Box h="4" />
        <LoginButton isLoading={isSubmitting} />
      </VStack>
    </Box>
  );
};

export default LoginForm;
