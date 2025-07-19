import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { fetchCurrentUser } from "../../services/userService";

interface PersonalInfoSectionProps {
  fullName: string;
  error: string | undefined;
  onFullNameChange: (value: string) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  error,
  onFullNameChange,
}) => {
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setEmployeeName(`${user.name}`);
      } catch (err) {
        console.error("Failed to fetch employee:", err);
      }
    };
    loadUser();
  }, []);

  return (
    <Box
      bg="#ffffff"
      p={6}
      borderRadius="16px"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
      border="1px solid #e2e8f0"
    >
      <Text fontSize="18px" fontWeight="600" color="#2d3748" mb={6}>
        Personal Information
      </Text>
      <FormControl isInvalid={!!error} mb={6}>
        <FormLabel fontSize="14px" fontWeight="600" color="#4a5568" mb={2}>
          Full Name
        </FormLabel>
        <Input
          value={employeeName}
          onChange={(e) => onFullNameChange(e.target.value)}
          placeholder="Enter your full name"
          bg="#f8fafc"
          border="2px solid #e2e8f0"
          borderRadius="12px"
          fontSize="16px"
          h="48px"
          _hover={{ borderColor: "#667eea", bg: "#ffffff" }}
          _focus={{
            borderColor: "#667eea",
            boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
            bg: "#ffffff",
          }}
          _invalid={{
            borderColor: "#e53e3e",
            boxShadow: "0 0 0 3px rgba(229, 62, 62, 0.1)",
          }}
          transition="all 0.2s ease"
        />
        <FormErrorMessage color="#e53e3e" fontSize="13px" mt={2}>
          {error}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default PersonalInfoSection;
