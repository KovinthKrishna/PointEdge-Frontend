import {
  Box,
  Flex,
  VStack,
  Image,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import bgImage from "../assets/1 1.png";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PopupAlert from "../components/Common/PopupAlert";

const ForgotPW: React.FC = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupStatus, setPopupStatus] = useState<"success" | "error">(
    "success"
  );
  const [popupTitle, setPopupTitle] = useState("");
  const [popupDescription, setPopupDescription] = useState("");

  const {
    control,
    formState: { errors },
  } = useForm();

  const handleRecoveryEmail = async () => {
    if (!username.trim()) {
      setPopupStatus("error");
      setPopupTitle("Verification has failed.");
      setPopupDescription("Please check your username again.");
      setPopupOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPopupStatus("success");
      setPopupTitle("Verification mail has sent.");
      setPopupDescription("Check your email.");
      setPopupOpen(true);
    } catch (error) {
      setPopupStatus("error");
      setPopupTitle("Verification failed.");
      setPopupDescription("Failed to send recovery email. Try again.");
      setPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex height="100vh" width="100vw" bg="#003049">
      {/* Left - Form */}

      <Box
        flex={0.75}
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontFamily="Poppins, sans-serif"
      >
        <VStack
          spacing={4}
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          height="90%"
          width="90%"
        >
          <Box h="4" />
          <Text fontSize="30px" color="#003049">
            Welcome to
            <Heading fontSize="55px" color="#008ED8">
              Point Edge
            </Heading>
          </Text>

          <Box h="4" />

          <Heading fontSize="30px" color="#003049">
            Forgot Password
            <Text fontSize="16px" color="#008ED8" textAlign="center">
              Don't worry. We got you!
            </Text>
          </Heading>

          <FormControl isInvalid={!!errors.username} color="#003049">
            <FormLabel fontSize="14px">Email</FormLabel>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setUsername(e.target.value);
                  }}
                  borderWidth="2px"
                />
              )}
            />
            <FormErrorMessage>
              {typeof errors.username?.message === "string" &&
                errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <Box>
            <Button
              onClick={handleRecoveryEmail}
              type="button"
              bg="#003049"
              color="white"
              width="100%"
              height="2.5rem" // Adjust this to control height
              isLoading={isLoading}
              _hover={{ bg: "#002637" }}
              borderRadius="6px"
              fontSize="md"
              fontWeight="bold"
              textAlign="center"
            >
              Send Mail
            </Button>
          </Box>
        </VStack>
      </Box>

      {/* Right - Background Image */}
      <Box flex={1.25} position="relative">
        <Image
          src={bgImage}
          alt="Background"
          objectFit="cover"
          height="100%"
          width="100%"
        />
        {/* Text in top-right corner */}
        <Box position="absolute" top="10" right="10" textAlign="right">
          <Heading
            fontSize="55px"
            color="white"
            fontFamily="Poppins"
            mb={2} // margin bottom for spacing between lines
          >
            Empowering Your Sales
          </Heading>
          <Text
            fontSize="30px"
            fontStyle="italic"
            color="#00FFF2
          "
            fontFamily="Poppins"
          >
            Streamlining your success
          </Text>
        </Box>
      </Box>
      <PopupAlert
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        status={popupStatus}
        title={popupTitle}
        description={popupDescription}
      />
    </Flex>
  );
};

export default ForgotPW;
