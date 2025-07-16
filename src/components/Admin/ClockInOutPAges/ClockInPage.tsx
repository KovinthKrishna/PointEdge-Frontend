import React from "react";
import bgImage from "../../../assets/1 1.png";
import { Box, Flex, Button, Image, VStack, IconButton, Heading, Avatar, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";
import shiftFrontPage from "../../../assets/ShiftFrontPage.png";
import logo from "../../../assets/logo.png";


const ClockInPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleClose = () => {
    navigate && navigate("/admin");
    console.log("Closed tab, navigated to admin page");
  };

  // Example user info (replace with real data as needed)
  const user = {
    name: "Eleanor Pena",
    id: "2377373",
    role: "Cashier",
    image: "https://bit.ly/dan-abramov",
  };

  return (
    <Box minH="100vh" width="100vw" position="relative" display="flex" alignItems="center" justifyContent="center" p={{ base: 2, md: 6 }}>
      {/* Background image and overlay */}
      <Image src={bgImage} alt="Background" objectFit="cover" position="absolute" top={0} left={0} w="100vw" h="100vh" zIndex={0} opacity={0.5} />
      <Box position="absolute" top={0} left={0} w="100vw" h="100vh" bg="#003049" opacity={0.5} zIndex={0} />
      {/* Background image and overlay */}
      <Image src={bgImage} alt="Background" objectFit="cover" position="absolute" top={0} left={0} w="100vw" h="100vh" zIndex={0} opacity={0.5} />
      <Box position="absolute" top={0} left={0} w="100vw" h="100vh" bg="#003049" opacity={0.5} zIndex={0} />
      <Flex
        h={{ base: "auto", md: "540px" }}
        maxW="3xl"
        w="full"
        bg="white"
        rounded={{ base: "xl", md: "2xl" }}
        overflow="hidden"
        boxShadow="2xl"
        direction={{ base: "column", md: "row" }}
        position="relative"
        border="1px solid #e3e8ee"
      >
        {/* Close Button at upper right corner */}
        <IconButton
          aria-label="Close tab"
          icon={<CloseIcon boxSize={5} color="#003049" />}
          position="absolute"
          top="20px"
          right="20px"
          color="#003049"
          bg="white"
          borderRadius="full"
          border="2px solid #003049"
          isRound={true}
          size="md"
          boxShadow="md"
          zIndex={10}
          _hover={{ bg: "gray.200" }}
          onClick={handleClose}
        />
        {/* Left Panel - Image */}
        <Box flex="1" bg="#003049" display="flex" alignItems="center" justifyContent="center" p={{ base: 2, md: 4 }}>
          <Image src={shiftFrontPage} alt="Shift Front Page" maxH="90%" maxW="100%" objectFit="contain" borderRadius="lg" boxShadow="lg" />
        </Box>

        {/* Right Panel - Employee Info and Clock In */}
        <Flex flex="1" bg="white" p={{ base: 6, md: 10 }} flexDirection="column" alignItems="center" position="relative" justifyContent="space-between">
          {/* Date and Time at the top */}
          <Box textAlign="center" w="full" mb={2} mt={2}>
            <Text fontSize={{ base: "sm", md: "lg" }} color="gray.500" fontWeight="medium">{formattedDate}</Text>
            <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold" color="gray.500" letterSpacing="wide" mt={1}>{formattedTime}</Text>
          </Box>
          {/* Employee Info centered vertically between top and bottom */}
          <Flex flexDirection="column" alignItems="center" justifyContent="center" flex={0}>
            <Heading size="lg" textAlign="center" color="gray.800" mb={6}>{user.name}</Heading>
            <Avatar
              size="xl"
              name={user.name}
              src={user.image}
              border="3px"
              borderColor="gray.200"
              boxShadow="md"
              mb={2}
            />
            <VStack textAlign="center" spacing={1}>
              <Text fontSize="lg" color="gray.600">ID - {user.id}</Text>
              <Text fontSize="lg" color="gray.600">Role - {user.role}</Text>
            </VStack>
          </Flex>
          {/* Clock In button at the bottom */}
          <Button
            bg="#2f855a"
            color="white"
            _hover={{ bg: "#276749" }}
            size="sm"
            w="full"
            maxW="140px"
            fontWeight="bold"
            borderRadius="full"
            fontSize={{ base: "sm", md: "md" }}
            boxShadow="md"
            onClick={() => {
              // Record clock in date and time in localStorage
              localStorage.setItem("clockInDate", formattedDate);
              localStorage.setItem("clockInTime", formattedTime);
              // Navigate to admin page
              navigate("/admin");
            }}
            mb={2}
          >
            Clock In
          </Button>
          {/* POS Logo at bottom right */}
          <Box position="absolute" bottom="6" right="6">
            <Image src={logo} alt="POS Logo" h="10" w="auto" opacity={0.7} />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ClockInPage;
