// ResetPasswordForm.tsx
import {
  VStack,
  Stack,
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Icon,
} from "@chakra-ui/react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface Props {
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (val: boolean) => void;
  loading: boolean;
  handleReset: () => void;
}

const ResetPasswordForm = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  loading,
  handleReset,
}: Props) => (
  <VStack spacing={6} p={5}>
    <Stack spacing={5} width="100%">
      <Box>
        <Text mb={2} fontSize="sm" fontWeight="600">
          New Password
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={Lock} />
          </InputLeftElement>
          <Input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <Button
            variant="ghost"
            size="sm"
            position="absolute"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon as={showPassword ? EyeOff : Eye} />
          </Button>
        </InputGroup>
      </Box>

      <Box>
        <Text mb={2} fontSize="sm" fontWeight="600">
          Confirm New Password
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={Lock} />
          </InputLeftElement>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          <Button
            variant="ghost"
            size="sm"
            position="absolute"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon as={showConfirmPassword ? EyeOff : Eye} />
          </Button>
        </InputGroup>
      </Box>
    </Stack>

    <Button
      onClick={handleReset}
      type="button"
      bgGradient="linear(to-r, #003049, #0056b3)"
      color="white"
      width="100%"
      height="50px"
      isLoading={loading}
      loadingText="Resetting Password..."
      _hover={{
        bgGradient: "linear(to-r, #002637, #004494)",
        transform: "translateY(-2px)",
        boxShadow: "0 10px 25px -5px rgba(0, 48, 73, 0.4)",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      borderRadius="lg"
      fontSize="md"
      fontWeight="700"
      textTransform="uppercase"
      letterSpacing="0.5px"
      transition="all 0.2s ease-in-out"
      boxShadow="0 4px 15px -3px rgba(0, 48, 73, 0.2)"
    >
      Reset Password
    </Button>
  </VStack>
);

export default ResetPasswordForm;
