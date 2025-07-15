import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Heading, Button, Avatar, Image, VStack, Center, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

const ClockInPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState("Store 01");
  const navigate = useNavigate();

  useEffect(() => {
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
  });

  const user = {
    name: "Eleanor Pena",
    id: "2377373",
    role: "Cashier",
    image: "https://bit.ly/dan-abramov",
  };

  const handleBack = () => {
    navigate("/clockinout");
    console.log("Navigate back to clockinout page");
  };

  const handleDone = () => {
    navigate("/admin");
    console.log("Navigate to admin page");
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-br, #f8fafc, #e3e8ee)" display="flex" alignItems="center" justifyContent="center" p={{ base: 2, md: 6 }}>
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
        {/* Left Panel - User Info */}
        <Box
          flex="1"
          bg="#003049"
          color="white"
          p={{ base: 2, md: 4 }}
          display="flex"
          flexDirection="column"
          position="relative"
        >
          {/* Modified button to be a perfect circle */}
          <IconButton
            aria-label="Go back"
            icon={<ArrowBackIcon boxSize={5} />}
            position="absolute"
            top="4"
            left="4"
            color="white"
            variant="outline"
            borderRadius="full"
            border="2px solid white"
            isRound={true}
            size="md"
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={handleBack}
          />

          <Flex flex="1" flexDirection="column" alignItems="center" justifyContent="center" gap={6}>
            <Heading size="lg" textAlign="center">{user.name}</Heading>
            <Avatar
              size="2xl"
              name={user.name}
              src={user.image}
              border="4px"
              borderColor="whiteAlpha.200"
              boxShadow="lg"
            />
            <VStack textAlign="center" spacing={2}>
              <Text fontSize="lg">ID - {user.id}</Text>
              <Text fontSize="lg">Role - {user.role}</Text>
            </VStack>
          </Flex>

          {/* Logo at bottom */}
           <Box position="absolute" bottom="4" left="4">
            <Image 
              src={logo}
              alt="Company Logo"
              h="12"
              w="auto"
            />
          </Box>
        </Box>

        {/* Right Panel - Clock In */}
        <Flex flex="1" bg="white" p={{ base: 6, md: 10 }} flexDirection="column" alignItems="center" justifyContent="center" position="relative">
          <Heading size="lg" mb={8} color="gray.800">Shift</Heading>
          <VStack spacing={6} w="full">
            <Center
              bg="#2f855a"
              color="white"
              py={2}
              px={6}
              borderRadius="full"
              fontWeight="bold"
              fontSize={{ base: "md", md: "lg" }}
              boxShadow="sm"
              letterSpacing="wide"
            >
              Clock In
            </Center>
            <Flex alignItems="center" justifyContent="center" gap={2}>
              <Text fontWeight="semibold" color="gray.700" fontSize="lg">Location :</Text>
              <Text color="gray.600" fontSize="lg">{location}</Text>
            </Flex>
            <Box
              bg="gray.200"
              p={6}
              w="full"
              maxW="220px"
              textAlign="center"
              boxShadow="sm"
              borderRadius="md"
            >
              <Text fontSize="md" color="gray.600" mb={2}>{formattedDate}</Text>
              <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="gray.800">{formattedTime}</Text>
            </Box>
          </VStack>
          <Box position="absolute" bottom="24px" right="24px">
            <Button
              bg="#003049"
              _hover={{ bg: "rgba(0, 48, 73, 0.9)" }}
              color="white"
              px={5}
              py={1.5}
              borderRadius="md"
              fontWeight="medium"
              fontSize={{ base: "sm", md: "md" }}
              boxShadow="md"
              onClick={handleDone}
              minW="70px"
            >
              Done
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ClockInPage;