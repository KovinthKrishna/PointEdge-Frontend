import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Flex,
  Box,
} from "@chakra-ui/react";
import { InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import LeftArrowButton from "./Common/LeftArrowButton";
import PopupAlert from "./Common/PopupAlert";

const RegistrationForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    email: "",
    tempPassword: "",
    confirmPassword: "",
    role: "",
    status: "",
    avatar: "",
  });

  // Popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupStatus, setPopupStatus] = useState<"success" | "error">(
    "success"
  );
  const [popupTitle, setPopupTitle] = useState("");
  const [popupDescription, setPopupDescription] = useState("");

  const handlePopupClose = () => {
    setPopupOpen(false);
    if (popupStatus === "success") {
      onClose();
    }
  };

  const handleGoBack = () => {
    onClose();
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (formData.tempPassword !== formData.confirmPassword) {
      setPopupStatus("error");
      setPopupTitle("Password Mismatch");
      setPopupDescription("Passwords do not match.");
      setPopupOpen(true);
      return;
    }
    if (!formData.role) {
      setPopupStatus("error");
      setPopupTitle("Missing Role");
      setPopupDescription("Please select a role.");
      setPopupOpen(true);
      return;
    }
    if (!formData.status) {
      setPopupStatus("error");
      setPopupTitle("Missing Status");
      setPopupDescription("Please select a status.");
      setPopupOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/employees/register",
        formData
      );

      if (response.status === 200) {
        setPopupStatus("success");
        setPopupTitle("Registration Successful");
        setPopupDescription("Employee has been registered successfully.");
        setPopupOpen(true);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error: any) {
      const backendMsg = error?.response?.data?.message;
      setPopupStatus("error");
      setPopupTitle("Registration Failed");
      setPopupDescription(
        backendMsg || "Something went wrong. Please try again."
      );
      setPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PopupAlert
        isOpen={popupOpen}
        onClose={handlePopupClose}
        status={popupStatus}
        title={popupTitle}
        description={popupDescription}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="6xl">
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(4px)" />
        <ModalContent
          maxW="90%"
          maxH="90vh"
          borderRadius="16px"
          borderWidth="2px"
          borderColor="#003049"
          bg="#FFFFFF"
          boxShadow="0 25px 50px -12px rgba(0, 48, 73, 0.25)"
          overflow="hidden"
        >
          <Box position="relative">
            <LeftArrowButton onClick={handleGoBack} />
            <ModalHeader
              mt={6}
              mb={4}
              textAlign="center"
              fontSize="2xl"
              fontWeight="700"
              color="#003049"
              bg="linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)"
              py={6}
              borderBottom="1px solid #E2E8F0"
            >
              Register a New Employee
            </ModalHeader>
          </Box>

          <ModalBody
            p={0}
            overflow="hidden"
            display="flex"
            flexDirection="column"
            height="calc(90vh - 200px)"
          >
            <Box
              flex="1"
              overflowY="auto"
              px={8}
              py={6}
              css={{
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#F1F5F9",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#CBD5E1",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#94A3B8",
                },
              }}
            >
              <Stack direction="row" spacing={10} align="flex-start" h="100%">
                <Flex direction="column" flex="1" gap={6}>
                  <FormControl isRequired>
                    <FormLabel
                      color="#374151"
                      fontWeight="600"
                      fontSize="sm"
                      mb={2}
                    >
                      First Name
                    </FormLabel>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      borderColor="#D1D5DB"
                      borderRadius="8px"
                      bg="#FFFFFF"
                      _hover={{ borderColor: "#003049" }}
                      _focus={{
                        borderColor: "#003049",
                        boxShadow: "0 0 0 1px #003049",
                        bg: "#FFFFFF",
                      }}
                      transition="all 0.2s ease-in-out"
                      height="44px"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel
                      color="#374151"
                      fontWeight="600"
                      fontSize="sm"
                      mb={2}
                    >
                      Email Address
                    </FormLabel>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      type="email"
                      borderColor="#D1D5DB"
                      borderRadius="8px"
                      bg="#FFFFFF"
                      _hover={{ borderColor: "#003049" }}
                      _focus={{
                        borderColor: "#003049",
                        boxShadow: "0 0 0 1px #003049",
                        bg: "#FFFFFF",
                      }}
                      transition="all 0.2s ease-in-out"
                      height="44px"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel
                      color="#374151"
                      fontWeight="600"
                      fontSize="sm"
                      mb={2}
                    >
                      Date of Birth
                    </FormLabel>
                    <Input
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      type="date"
                      borderColor="#D1D5DB"
                      borderRadius="8px"
                      bg="#FFFFFF"
                      _hover={{ borderColor: "#003049" }}
                      _focus={{
                        borderColor: "#003049",
                        boxShadow: "0 0 0 1px #003049",
                        bg: "#FFFFFF",
                      }}
                      transition="all 0.2s ease-in-out"
                      height="44px"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel
                      color="#374151"
                      fontWeight="600"
                      fontSize="sm"
                      mb={2}
                    >
                      Temporary Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        name="tempPassword"
                        value={formData.tempPassword}
                        onChange={handleInputChange}
                        placeholder="Enter temporary password"
                        type={showPassword ? "text" : "password"}
                        borderColor="#D1D5DB"
                        borderRadius="8px"
                        bg="#FFFFFF"
                        _hover={{ borderColor: "#003049" }}
                        _focus={{
                          borderColor: "#003049",
                          boxShadow: "0 0 0 1px #003049",
                          bg: "#FFFFFF",
                        }}
                        transition="all 0.2s ease-in-out"
                        height="44px"
                        pr="48px"
                      />
                      <InputRightElement height="44px">
                        <IconButton
                          variant="ghost"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowPassword(!showPassword)}
                          size="sm"
                          color="#6B7280"
                          _hover={{ color: "#003049", bg: "#F3F4F6" }}
                          transition="all 0.2s ease-in-out"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel
                      color="#374151"
                      fontWeight="600"
                      fontSize="sm"
                      mb={2}
                    >
                      Role
                    </FormLabel>
                    <Select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="Select employee role"
                      borderColor="#D1D5DB"
                      borderRadius="8px"
                      bg="#FFFFFF"
                      _hover={{ borderColor: "#003049" }}
                      _focus={{
                        borderColor: "#003049",
                        boxShadow: "0 0 0 1px #003049",
                        bg: "#FFFFFF",
                      }}
                      transition="all 0.2s ease-in-out"
                      height="44px"
                    >
                      <option value="ADMIN">Administrator</option>
                      <option value="USER">User</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      color="#374151"
                      fontWeight="600"
                      fontSize="sm"
                      mb={2}
                    >
                      Avatar URL (Optional)
                    </FormLabel>
                    <Input
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleInputChange}
                      placeholder="Enter avatar image URL"
                      borderColor="#D1D5DB"
                      borderRadius="8px"
                      bg="#FFFFFF"
                      _hover={{ borderColor: "#003049" }}
                      _focus={{
                        borderColor: "#003049",
                        boxShadow: "0 0 0 1px #003049",
                        bg: "#FFFFFF",
                      }}
                      transition="all 0.2s ease-in-out"
                      height="44px"
                    />
                  </FormControl>
                </Flex>

                <Flex direction="column" flex="1" gap={6}>
                  <FormControl isRequired>
                    <FormLabel
                      color="#374151"
                      fontWeight="600"
                      fontSize="sm"
                      mb={2}
                    >
                      Last Name
                    </FormLabel>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      borderColor="#D1D5DB"
                      borderRadius="8px"
                      bg="#FFFFFF"
                      _hover={{ borderColor: "#003049" }}
                      _focus={{
                        borderColor: "#003049",
                        boxShadow: "0 0 0 1px #003049",
                        bg: "#FFFFFF",
                      }}
                      transition="all 0.2s ease-in-out"
                      height="44px"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel
                      color="#374151"
                      fontWeight="600"
                      fontSize="sm"
                      mb={2}
                    >
                      Phone Number
                    </FormLabel>
                    <Input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      borderColor="#D1D5DB"
                      borderRadius="8px"
                      bg="#FFFFFF"
                      _hover={{ borderColor: "#003049" }}
                      _focus={{
                        borderColor: "#003049",
                        boxShadow: "0 0 0 1px #003049",
                        bg: "#FFFFFF",
                      }}
                      transition="all 0.2s ease-in-out"
                      height="44px"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel
                      color="#374151"
                      fontWeight="600"
                      fontSize="sm"
                      mb={2}
                    >
                      Confirm Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm password"
                        type={showConfirmPassword ? "text" : "password"}
                        borderColor="#D1D5DB"
                        borderRadius="8px"
                        bg="#FFFFFF"
                        _hover={{ borderColor: "#003049" }}
                        _focus={{
                          borderColor: "#003049",
                          boxShadow: "0 0 0 1px #003049",
                          bg: "#FFFFFF",
                        }}
                        transition="all 0.2s ease-in-out"
                        height="44px"
                        pr="48px"
                      />
                      <InputRightElement height="44px">
                        <IconButton
                          variant="ghost"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          icon={
                            showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />
                          }
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          size="sm"
                          color="#6B7280"
                          _hover={{ color: "#003049", bg: "#F3F4F6" }}
                          transition="all 0.2s ease-in-out"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel
                      color="#374151"
                      fontWeight="600"
                      fontSize="sm"
                      mb={2}
                    >
                      Status
                    </FormLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      placeholder="Select employee status"
                      borderColor="#D1D5DB"
                      borderRadius="8px"
                      bg="#FFFFFF"
                      _hover={{ borderColor: "#003049" }}
                      _focus={{
                        borderColor: "#003049",
                        boxShadow: "0 0 0 1px #003049",
                        bg: "#FFFFFF",
                      }}
                      transition="all 0.2s ease-in-out"
                      height="44px"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </Select>
                  </FormControl>
                </Flex>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter
            justifyContent="center"
            gap={4}
            bg="linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)"
            borderTop="1px solid #E2E8F0"
            py={6}
          >
            <Button
              onClick={onClose}
              variant="outline"
              isDisabled={isLoading}
              borderColor="#D1D5DB"
              color="#6B7280"
              _hover={{
                borderColor: "#9CA3AF",
                color: "#374151",
                bg: "#F9FAFB",
              }}
              _active={{ bg: "#F3F4F6" }}
              transition="all 0.2s ease-in-out"
              height="44px"
              px={8}
              fontWeight="600"
            >
              Cancel
            </Button>
            <Button
              color="#FFFFFF"
              bg="#003049"
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Registering..."
              _hover={{
                bg: "#002A3F",
                transform: "translateY(-1px)",
                boxShadow: "0 10px 25px -5px rgba(0, 48, 73, 0.3)",
              }}
              _active={{
                bg: "#001F2E",
                transform: "translateY(0px)",
              }}
              transition="all 0.2s ease-in-out"
              height="44px"
              px={8}
              fontWeight="600"
              boxShadow="0 4px 14px 0 rgba(0, 48, 73, 0.2)"
            >
              Register Employee
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegistrationForm;
