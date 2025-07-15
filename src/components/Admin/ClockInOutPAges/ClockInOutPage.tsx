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

        {/* Right Panel - Date/Time and Buttons */}
        <Flex flex="1" bg="white" p={{ base: 6, md: 10 }} flexDirection="column" alignItems="center" justifyContent="center" position="relative">
          <VStack spacing={8} w="full">
            <Box textAlign="center" mb={2}>
              <Box fontSize={{ base: "md", md: "xl" }} color="gray.600" fontWeight="medium">{formattedDate}</Box>
              <Box fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold" color="#003049" letterSpacing="wide" mt={2}>{formattedTime}</Box>
            </Box>
            <Button
              bg="#2f855a"
              color="white"
              _hover={{ bg: "#276749" }}
              size="md"
              w="full"
              maxW="180px"
              fontWeight="bold"
              borderRadius="full"
              fontSize={{ base: "md", md: "lg" }}
              boxShadow="md"
              onClick={() => navigate("/clock-in")}
            >
              Clock In
            </Button>
            <Button
              bg="#c53030"
              color="white"
              _hover={{ bg: "#9b2c2c" }}
              size="md"
              w="full"
              maxW="180px"
              fontWeight="bold"
              borderRadius="full"
              fontSize={{ base: "md", md: "lg" }}
              boxShadow="md"
              onClick={() => navigate("/clock-out")}
            >
              Clock Out
            </Button>
          </VStack>
          {/* POS Logo at bottom right */}
          <Box position="absolute" bottom="6" right="6">
            <Image src={logo} alt="POS Logo" h="12" w="auto" opacity={0.7} />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ClockInOutPage;
