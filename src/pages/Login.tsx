import { Box, Flex, VStack, Image, Heading, Text } from "@chakra-ui/react";
import LoginForm from "../components/Login/LoginForm";
import bgImage from "../assets/1 1.png";

const Login: React.FC = () => {
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
            Login
            <Text fontSize="16px" color="#008ED8" textAlign="center">
              to access your account
            </Text>
          </Heading>

          <LoginForm />
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
    </Flex>
  );
};

export default Login;
