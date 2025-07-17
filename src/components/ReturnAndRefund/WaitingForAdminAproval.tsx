import React, { useEffect, useRef } from "react";
import { Spinner, VStack, Text, Box, useToast } from "@chakra-ui/react";
import axiosInstance from "../../axiosConfig";

interface WaitingProps {
  invoiceNumber: string;
  onApproved: () => void; // Add callback for approval
  onRejected: () => void; // Add callback for rejection
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

        // Handle different possible response structures
        const status = res.data?.status || res.data;
        console.log("Polling response:", res.data); // Debug log

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
          onApproved(); // Call the callback instead of navigating
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
          onRejected(); // Call the callback instead of navigating
        }
      } catch (error) {
        console.error("Polling failed", error);
        // Don't show toast for polling errors to avoid spamming
      }
    };

    // Poll immediately then set interval
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
    <VStack spacing={6} mt={12}>
      <Spinner size="xl" thickness="4px" color="blue.400" />
      <Box textAlign="center">
        <Text fontSize="lg" fontWeight="bold">
          Waiting for admin approval...
        </Text>
        <Text color="gray.500" fontSize="sm">
          Invoice #{invoiceNumber} – Your refund request is under review.
        </Text>
      </Box>
    </VStack>
  );
};

export default WaitingForAdminApproval;
