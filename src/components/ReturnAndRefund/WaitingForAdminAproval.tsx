import React, { useEffect, useRef } from "react";
import {
  Spinner,
  VStack,
  Text,
  Box,
  useToast,
  Flex,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import axiosInstance from "../../axiosConfig";

// Animation for the pulse effect
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

// Clock icon component
const ClockIcon = () => (
  <Icon viewBox="0 0 24 24" boxSize={6} color="blue">
    <path
      fill="currentColor"
      d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"
    />
  </Icon>
);

interface WaitingProps {
  invoiceNumber: string;
  onApproved: () => void;
  onRejected: () => void;
}

const WaitingForAdminApproval: React.FC<WaitingProps> = ({
  invoiceNumber,
  onApproved,
  onRejected,
}) => {
  const toast = useToast();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    console.log("Starting polling for invoice:", invoiceNumber);

    const pollStatus = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/refund-requests/status/${invoiceNumber}`
        );

        const status = res.data?.status || res.data;
        console.log("Polling response:", res.data);

        if (status === "APPROVED") {
          toast({
            title: "Approved",
            description: "Admin has approved your request.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          onApproved();
        } else if (status === "REJECTED") {
          toast({
            title: "Rejected",
            description: "Admin rejected your refund request.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          onRejected();
        }
      } catch (error) {
        console.error("Polling failed", error);
      }
    };

    pollStatus();
    intervalRef.current = setInterval(pollStatus, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [invoiceNumber, toast, onApproved, onRejected]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="60vh"
      py={12}
      px={6}
    >
      {/* Main card container */}
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        border="1px solid"
        borderColor="lightGray"
        p={10}
        maxW="500px"
        w="full"
        position="relative"
        overflow="hidden"
      >
        {/* Background accent */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="4px"
          bg="linear-gradient(90deg, #008ED8 0%, #00669B 100%)"
        />

        {/* Content */}
        <VStack spacing={8}>
          {/* Animated icon container */}
          <Box
            position="relative"
            p={6}
            bg="skyBlue"
            borderRadius="full"
            animation={`${pulse} 2s ease-in-out infinite`}
          >
            <ClockIcon />

            {/* Spinner overlay */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Spinner
                size="xl"
                thickness="3px"
                color="lightBlue"
                speed="1s"
                emptyColor="transparent"
              />
            </Box>
          </Box>

          {/* Main heading */}
          <Box textAlign="center" maxW="400px">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="darkBlue"
              mb={2}
              lineHeight="1.2"
            >
              Waiting for Admin Approval
            </Text>

            <Text color="gray" fontSize="md" mb={4} lineHeight="1.5">
              Your refund request is currently under review. We'll notify you as
              soon as there's an update.
            </Text>
          </Box>

          {/* Invoice details card */}
          <Box
            bg="skyBlue"
            borderRadius="lg"
            p={4}
            w="full"
            border="1px solid"
            borderColor="lightBlue"
          >
            <Flex align="center" justify="space-between">
              <Box>
                <Text fontSize="sm" color="blue" fontWeight="medium" mb={1}>
                  Invoice Number
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="darkBlue">
                  #{invoiceNumber}
                </Text>
              </Box>

              <Badge
                colorScheme="blue"
                variant="solid"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="bold"
                bg="blue"
                color="white"
              >
                UNDER REVIEW
              </Badge>
            </Flex>
          </Box>

          {/* Status indicators */}
          <Box w="full">
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontSize="sm" color="gray" fontWeight="medium">
                Processing Status
              </Text>
              <Text fontSize="sm" color="blue" fontWeight="medium">
                In Progress
              </Text>
            </Flex>

            {/* Progress bar */}
            <Box
              w="full"
              bg="lightGray"
              borderRadius="full"
              h={2}
              overflow="hidden"
            >
              <Box
                h="full"
                bg="linear-gradient(90deg, #008ED8 0%, #00669B 100%)"
                borderRadius="full"
                w="60%"
                position="relative"
              >
                {/* Animated shimmer effect */}
                <Box
                  position="absolute"
                  top={0}
                  left={-100}
                  right={0}
                  bottom={0}
                  bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
                  animation={`${pulse} 1.5s ease-in-out infinite`}
                />
              </Box>
            </Box>
          </Box>

          {/* Additional info */}
          <Box
            textAlign="center"
            p={4}
            bg="lightGray"
            borderRadius="lg"
            w="full"
          >
            <Text fontSize="sm" color="gray" mb={1}>
              🔄 Checking for updates every 4 seconds
            </Text>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default WaitingForAdminApproval;
