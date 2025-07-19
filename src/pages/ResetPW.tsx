import {
  Flex,
  useToast,
  useColorModeValue,
  Container,
  ScaleFade,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ResetPWHeader from "../components/ResetPW/ResetPWHeader";
import ResetPasswordForm from "../components/ResetPW/ResetPasswordForm";
import ResetPWFooter from "../components/ResetPW/ResePWFooter";

const ResetPW = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const Navigate = useNavigate();

  const handleReset = async () => {
    if (!token) {
      toast({
        title: "Invalid or missing token.",
        status: "error",
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match.",
        status: "warning",
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/auth/reset-password", {
        token,
        newPassword,
      });
      toast({
        title: "Password reset successful!",
        status: "success",
        isClosable: true,
        position: "top",
      });
      setNewPassword("");
      setConfirmPassword("");
      Navigate("/login");
    } catch (error) {
      toast({
        title: "Error resetting password.",
        description: "Try again later.",
        status: "error",
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const bgGradient = useColorModeValue(
    "linear(to-br, #001122, #002244, #001133)",
    "linear(to-br, #000811, #001122, #000811)"
  );

  return (
    <Flex
      minHeight="100vh"
      align="center"
      justify="center"
      bgGradient={bgGradient}
    >
      <Container maxW="md" px={1}>
        <ScaleFade initialScale={0.9} in={true}>
          <Box
            bg="rgba(255, 255, 255, 0.98)"
            backdropFilter="blur(20px)"
            borderRadius="2xl"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.4)"
            overflow="hidden"
          >
            <ResetPWHeader />
            <ResetPasswordForm
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              loading={loading}
              handleReset={handleReset}
            />
            <ResetPWFooter />
          </Box>
        </ScaleFade>
      </Container>
    </Flex>
  );
};

export default ResetPW;
