import { Box, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom"; //to navigate pages
import UsernameInput from "./UserNameInput";
import PasswordInput from "./PasswordInput";
import ForgotPassword from "./ForgotPassword";
import LoginButton from "./LoginButton";
import { login } from "../../services/authService";
import { useForm } from "react-hook-form";
import PopupAlert from "../Common/PopupAlert";
import { useState } from "react";

// Validation schema using Yup
const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Must be 6 characters"),
});

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { token, role } = await login(data.username, data.password);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role); // ✅ store role

      // ✅ redirect based on role
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      setAlertTitle("Login Failed");
      setAlertDescription(error.message || "Something went wrong");
      setIsAlertOpen(true); // 🚨 show alert popup
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgotpw");
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

      <PopupAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        status="error"
        title={alertTitle}
        description={alertDescription}
      />
    </Box>
  );
};

export default LoginForm;
