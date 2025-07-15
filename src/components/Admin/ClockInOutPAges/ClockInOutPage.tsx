import React from "react";
import { Box, Flex, Button, Image, VStack, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";
import shiftFrontPage from "../../../assets/ShiftFrontPage.png";
import logo from "../../../assets/logo.png";


const ClockInOutPage: React.FC = () => {
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

  return (
    <Box minH="100vh" bg="gray.100" display="flex" alignItems="center" justifyContent="center" p={4}>
      <Flex
        h={{ base: "auto", md: "600px" }}
        maxW="4xl"
        w="full"
        bg="white"
        rounded="lg"
        overflow="hidden"
        boxShadow="lg"
        direction={{ base: "column", md: "row" }}
        position="relative"
      >
        {/* Close Button at upper right corner */}
        <IconButton
          aria-label="Close tab"
          icon={<CloseIcon boxSize={4} color="#003049" />}
          position="absolute"
          top="18px"
          right="18px"
          color="#003049"
          bg="white"
          borderRadius="full"
          border="2px solid #003049"
          isRound={true}
          size="md"
          boxShadow="md"
          zIndex={10}
          _hover={{ bg: "gray.100" }}
          onClick={handleClose}
        />
        {/* Left Panel - Image */}
        <Box flex="1" bg="#003049" display="flex" alignItems="center" justifyContent="center">
          <Image src={shiftFrontPage} alt="Shift Front Page" maxH="80%" maxW="90%" objectFit="contain" />
        </Box>

        {/* Right Panel - Date/Time and Buttons */}
        <Flex flex="1" bg="white" p={8} flexDirection="column" alignItems="center" justifyContent="center" position="relative">
          <VStack spacing={6} w="full">
            <Box textAlign="center" mb={4}>
              <Box fontSize="lg" color="gray.600">{formattedDate}</Box>
              <Box fontSize="3xl" fontWeight="bold" color="gray.800">{formattedTime}</Box>
            </Box>
            <Button
              bg="#2f855a"
              color="white"
              _hover={{ bg: "#276749" }}
              size="lg"
              w="60%"
              fontWeight="bold"
              borderRadius="full"
              fontSize="xl"
              onClick={() => navigate("/clock-in")}
            >
              CLOCK-IN
            </Button>
            <Button
              bg="#c53030"
              color="white"
              _hover={{ bg: "#9b2c2c" }}
              size="lg"
              w="60%"
              fontWeight="bold"
              borderRadius="full"
              fontSize="xl"
              onClick={() => navigate("/clock-out")}
            >
              CLOCK-OUT
            </Button>
          </VStack>
          {/* POS Logo at bottom right */}
          <Box position="absolute" bottom="4" right="4">
            <Image src={logo} alt="POS Logo" h="14" w="auto" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ClockInOutPage;
