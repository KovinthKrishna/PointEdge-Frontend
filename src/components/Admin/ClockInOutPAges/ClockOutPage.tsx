import React, { useState, useEffect } from "react";
import bgImage from "../../../assets/1 1.png";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import shiftFrontPage from "../../../assets/ShiftFrontPage.png";
import logo from "../../../assets/logo.png";

const ClockOutPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

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
    second: "2-digit",
  });

  const handleClose = () => {
    navigate("/dashboard");
    console.log("Closed tab, navigated to dashboard");
  };

  const handleClockOut = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8080/api/attendances/clock-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clockOut: formattedTime,
          date: new Date().toISOString().split("T")[0],
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        alert("Failed to clock out: " + errorMessage);
        setLoading(false);
        return;
      }

      alert("Clock-out successful at " + formattedTime);
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Failed to send clock-out data", err);
      alert("Error occurred while clocking out.");
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      width="100vw"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={{ base: 2, md: 6 }}
    >
      {/* Background image and overlay */}
      <Image
        src={bgImage}
        alt="Background"
        objectFit="cover"
        position="absolute"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        zIndex={0}
        opacity={0.5}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100vw"
        h="100vh"
        bg="#003049"
        opacity={0.5}
        zIndex={0}
      />
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
        {/* Left Panel - Image Section (larger, blue background) */}
        <Box flex="0.8" bg="#003049" display="flex" alignItems="center" justifyContent="center" p={{ base: 2, md: 4 }}>
          <Image src={shiftFrontPage} alt="Shift Front Page" maxH="100%" maxW="110%" objectFit="contain" borderRadius="lg" boxShadow="lg" />
        </Box>
        {/* Right Panel - Clock Out Section (smaller, white background) */}
        <Flex flex="0.7" bg="white" p={{ base: 6, md: 10 }} flexDirection="column" alignItems="center" position="relative" justifyContent="space-between">
          {/* Title above date and time */}
          <Box w="full" textAlign="left" mt={2} mb={4}>
            <Text fontSize={{ base: "lg", md: "3xl" }} color="#003049" fontWeight="semibold" fontFamily="Poppins, sans-serif">
              Welcome to
            </Text>
            <Text as="span" fontSize={{ base: "3xl", md: "3xl" }} color="#008ED8" fontWeight="bold" fontFamily="Poppins, sans-serif">
              Point Edge
            </Text>
          </Box>
          {/* Date and Time */}
          <Box textAlign="center" w="full" mb={2} mt={20}>
            <Text fontSize={{ base: "sm", md: "xl" }} color="gray.500" fontWeight="medium" mb={4}>
              {formattedDate}
            </Text>
            <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold" color="gray.500" letterSpacing="wide" mt={1}>
              {formattedTime}
            </Text>
          </Box>
          {/* Clock Out button at bottom */}
          <Box flex="1" display="flex" alignItems="flex-end" justifyContent="center" w="full" mb={16}>
            <Button
              bg="#E53E3E"
              color="white"
              _hover={{ bg: "#C53030" }}
              size="md"
              w="full"
              maxW="140px"
              fontWeight="bold"
              borderRadius="full"
              fontSize={{ base: "sm", md: "md" }}
              boxShadow="md"
              onClick={handleClockOut}
              isLoading={loading}
              loadingText="Clocking Out"
            >
              Clock Out
            </Button>
          </Box>
          {/* POS Logo at bottom right corner, aligned to border */}
          <Box position="absolute" right={0} bottom={0} m={4}>
            <Image src={logo} alt="POS Logo" h="12" w="auto" opacity={0.9} />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ClockOutPage;