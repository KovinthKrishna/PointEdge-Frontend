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
  Stack,
  Flex,
} from "@chakra-ui/react";
import { InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import LeftArrowButton from "./Common/LeftArrowButton";
import PopupAlert from "./Common/PopupAlert";

// Registration form component
const RegistrationForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    tempPassword: "",
    confirmPassword: "",
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
      onClose(); // Close the registration modal only if success
    }
  };

  const handleGoBack = () => {
    // Handle the back button functionality, like closing the modal or navigating back
    onClose();
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  // const toast = useToast();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    if (formData.tempPassword !== formData.confirmPassword) {
      setPopupStatus("error");
      setPopupTitle("Password Mismatch");
      setPopupDescription("Passwords do not match.");
      setPopupOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      // Send data to the backend
      const response = await axios.post(
        "http://localhost:8080/api/register",
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
      {/* Popup alert */}
      <PopupAlert
        isOpen={popupOpen}
        onClose={handlePopupClose}
        status={popupStatus}
        title={popupTitle}
        description={popupDescription}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW="80%"
          h={"80%"}
          borderRadius="8px"
          borderWidth={"4px"}
          borderColor={"#003049"}
        >
          <LeftArrowButton onClick={handleGoBack} />

          <ModalHeader mt={10} mb={7} textAlign="center">
            Register a new Employee
          </ModalHeader>
          <ModalBody>
            <Stack direction="row" spacing={8} align="flex-start" h="100%">
              {/* Right Section */}
              <Flex direction="column" flex="1">
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    type="email"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Temporary Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="tempPassword"
                      value={formData.tempPassword}
                      onChange={handleInputChange}
                      placeholder="Temporary Password"
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        size="sm"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Flex>

              {/* Left Section */}
              <Flex direction="column" flex="1">
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <InputRightElement>
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
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button onClick={onClose} variant="ghost" isDisabled={isLoading}>
              Cancel
            </Button>
            <Button
              color={"white"}
              bg={"#003049"}
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Registering"
            >
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegistrationForm;
