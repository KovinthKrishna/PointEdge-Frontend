import React from "react";
import {
  Box,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FormDataType } from "../../models/Types";

interface SecuritySectionProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  errors: {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
  showCurrentPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  toggleShowCurrentPassword: () => void;
  toggleShowNewPassword: () => void;
  toggleShowConfirmPassword: () => void;
  onInputChange: (field: keyof FormDataType, value: string) => void;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({
  currentPassword,
  newPassword,
  confirmPassword,
  errors,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  toggleShowCurrentPassword,
  toggleShowNewPassword,
  toggleShowConfirmPassword,
  onInputChange,
}) => {
  return (
    <Box
      bg="#ffffff"
      p={6}
      borderRadius="16px"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
      border="1px solid #e2e8f0"
    >
      <Text fontSize="18px" fontWeight="600" color="#2d3748" mb={6}>
        Security Settings
      </Text>
      <VStack spacing={6} align="stretch">
        <FormControl isInvalid={!!errors.currentPassword} isRequired>
          <FormLabel fontSize="14px" fontWeight="600" color="#4a5568" mb={2}>
            Current Password
          </FormLabel>
          <InputGroup>
            <Input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => onInputChange("currentPassword", e.target.value)}
              placeholder="Enter current password"
            />
            <InputRightElement h="48px">
              <IconButton
                aria-label="Toggle password visibility"
                icon={showCurrentPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={toggleShowCurrentPassword}
                variant="ghost"
                size="sm"
                color="#718096"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.newPassword}>
          <FormLabel fontSize="14px" fontWeight="600" color="#4a5568" mb={2}>
            New Password
          </FormLabel>
          <InputGroup>
            <Input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => onInputChange("newPassword", e.target.value)}
              placeholder="Enter new password (optional)"
            />
            <InputRightElement h="48px">
              <IconButton
                aria-label="Toggle password visibility"
                icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={toggleShowNewPassword}
                variant="ghost"
                size="sm"
                color="#718096"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
        </FormControl>

        {newPassword && (
          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel fontSize="14px" fontWeight="600" color="#4a5568" mb={2}>
              Confirm New Password
            </FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  onInputChange("confirmPassword", e.target.value)
                }
                placeholder="Confirm new password"
              />
              <InputRightElement h="48px">
                <IconButton
                  aria-label="Toggle password visibility"
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={toggleShowConfirmPassword}
                  variant="ghost"
                  size="sm"
                  color="#718096"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>
        )}
      </VStack>
    </Box>
  );
};

export default SecuritySection;
