import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Heading, Button, Avatar, Container, Image, VStack, Center, IconButton, useColorModeValue } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

const ClockOutPage: React.FC = () => {
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
    navigate && navigate("/login");
    console.log("Navigate back");
  };

  return (
    <Box minH="100vh" bg="gray.100" display="flex" alignItems="center" justifyContent="center" p={4}>
      <Flex 
        h="600px" 
        maxW="4xl" 
        w="full" 
        bg="white" 
        rounded="lg" 
        overflow="hidden" 
        boxShadow="lg"
        border="3px solid #003049"
      >
        {/* Left Panel - User Info (Unchanged) */}
        <Box 
          flex="1" 
          bg="#003049" 
          color="white" 
          p={6} 
          display="flex" 
          flexDirection="column"
          position="relative"
        >
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

          <Flex flex="1" flexDirection="column" alignItems="center" justifyContent="center" gap={8}>
            <Heading size="lg" textAlign="center">{user.name}</Heading>

            <Avatar 
              size="2xl" 
              name={user.name} 
              src={user.image} 
              border="4px" 
              borderColor="whiteAlpha.200"
            />

            <VStack textAlign="center" spacing={3}>
              <Text fontSize="xl">ID - {user.id}</Text>
              <Text fontSize="xl">Role - {user.role}</Text>
            </VStack>
          </Flex>

          <Box position="absolute" bottom="4" left="4">
            <Image 
              src={logo}
              alt="Company Logo"
              h="12"
              w="auto"
            />
          </Box>
        </Box>

        {/* Right Panel - Clock Out (Modified) */}
        <Flex flex="1" bg="white" p={8} flexDirection="column">
          <Heading size="lg" mb={12} color="gray.800">Shift</Heading>

          <Flex flex="1" flexDirection="column" alignItems="center" justifyContent="center" gap={8}>
            {/* Clock Out text with red background (changed from green) */}
            <Center
              bg="#E53E3E"  // Changed to red color
              color="white"
              py={2}
              px={6}
              borderRadius="full"
              fontWeight="bold"
              boxShadow="sm"
            >
              Clock Out  {/* Changed from "Clock In" to "Clock Out" */}
            </Center>

            <Flex alignItems="center" justifyContent="center" gap={2}>
              <Text fontWeight="semibold" color="gray.700" fontSize="xl">Location :</Text>
              <Text color="gray.600" fontSize="xl">{location}</Text>
            </Flex>

            <Box 
              bg="gray.200" 
              p={6} 
              w="80" 
              textAlign="center" 
              boxShadow="sm"
              borderRadius="md"
            >
              <Text fontSize="md" color="gray.600" mb={2}>{formattedDate}</Text>
              <Text fontSize="4xl" fontWeight="bold" color="gray.800">{formattedTime}</Text>
            </Box>
          </Flex>

          <Flex justifyContent="flex-end" mt={8}>
            <Button
              bg="#003049"
              _hover={{ bg: "rgba(0, 48, 73, 0.9)" }}
              color="white"
              px={8}
              py={2}
              borderRadius="md"
              fontWeight="medium"
              onClick={handleBack}
            >
              Done
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ClockOutPage;