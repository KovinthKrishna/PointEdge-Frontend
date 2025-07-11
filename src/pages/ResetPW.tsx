import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPW = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match.",
        status: "warning",
        isClosable: true,
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
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex height="100vh" align="center" justify="center" bg="#003049">
      <VStack bg="white" p={8} borderRadius="lg" boxShadow="lg" spacing={4}>
        <Heading color="#003049" size="lg">
          Reset Your Password
        </Heading>
        <Input
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          placeholder="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          onClick={handleReset}
          type="button"
          bg="#003049"
          color="white"
          width="100%"
          height="2.5rem" // Adjust this to control height
          isLoading={loading}
          _hover={{ bg: "#002637" }}
          borderRadius="6px"
          fontSize="md"
          fontWeight="bold"
          textAlign="center"
        >
          Reset Password
        </Button>

        <Text fontSize="sm" color="gray.500">
          You were redirected here from email
        </Text>
        <Text fontSize="sm" color="gray.500">
          @PointEdge
        </Text>
      </VStack>
    </Flex>
  );
};

export default ResetPW;
