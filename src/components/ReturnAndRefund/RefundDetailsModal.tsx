import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Box,
  Text,
  Button,
  Image,
  Badge,
  HStack,
  Spinner,
  useToast,
  Flex,
  Divider,
  Icon,
  Center,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  RefreshCw,
  Package,
  Calendar,
  AlertCircle,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import axiosInstance from "../../services/verifyService";
import { ReturnedItem } from "../../models/ReturnTypes";
import { useNavigate } from "react-router-dom";
import { useRefundStore } from "../../store/useRefundRequestStore";
import { InvoiceItem } from "../../models/Invoice";
import { useEmployeeStore } from "../../store/useEmployeeStore";
import { RefundStep } from "../../models/RefundStep";

export interface RefundRequest {
  requestId: number;
  id: number;
  invoiceNumber: string;
  refundMethod: string;
  items: ReturnedItem[];
  status: string;
  createdAt?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const getStatusColor = (status: string) => {
  switch (status?.toUpperCase()) {
    case "APPROVED":
      return "green";
    case "REJECTED":
      return "red";
    case "PENDING":
      return "yellow";
    default:
      return "gray";
  }
};

const getStatusIcon = (status: string) => {
  switch (status?.toUpperCase()) {
    case "APPROVED":
      return CheckCircle;
    case "REJECTED":
      return XCircle;
    case "PENDING":
      return Clock;
    default:
      return AlertCircle;
  }
};

const RefundDetailsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [requests, setRequests] = useState<RefundRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  const setRefundState = useRefundStore((s) => s.setRefundState);
  const employee = useEmployeeStore((state) => state.employee);
  const employeeId = employee?.id;

  // Theme-aware colors
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headerBg = useColorModeValue("skyBlue", "gray.700");

  const loadRequests = async () => {
    if (!employeeId) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/return-exchange/salesperson/${employeeId}/refund-requests`
      );
      const allRequests: RefundRequest[] = res.data;

      const visibleRequests = allRequests.filter(
        (r) =>
          r.status?.toUpperCase() !== "COMPLETED" &&
          r.status?.toUpperCase() !== "CANCELLED" &&
          r.status?.toUpperCase() !== "REJECTED"
      );

      setRequests(visibleRequests);
    } catch (err) {
      toast({
        title: "Failed to fetch refund requests",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (requestId: number) => {
    try {
      await axiosInstance.delete(
        `/return-exchange/delete-request/${requestId}`
      );

      toast({
        title: "Request Removed",
        status: "info",
        duration: 3000,
        isClosable: true,
      });

      await loadRequests();
    } catch (err: any) {
      if (err.response?.status === 404) {
        toast({
          title: "Already deleted",
          description: `Refund request ID ${requestId} not found.`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });

        await loadRequests();
      } else {
        toast({
          title: "Remove Failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleCancel = async (request: RefundRequest) => {
    try {
      await axiosInstance.post(
        `return-exchange/cancel-request/${request.requestId}`
      );
      toast({
        title: "Request Canceled",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      loadRequests();
    } catch (err) {
      toast({
        title: "Cancel Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleContinue = (request: RefundRequest) => {
    const invoiceItems: InvoiceItem[] = request.items.map((item, index) => ({
      id: String(index),
      productId: String(item.productId ?? 0),
      name: item.productName ?? "Unnamed",
      quantity: item.quantity,
      price: item.unitPrice,
      refundAmount: item.refundAmount ?? item.unitPrice * item.quantity,
      returnQuantity: item.quantity,
      reason: item.reason,
      returnPhoto: undefined,
      photoPreviewUrl: item.photoPath,
      photoPath: item.photoPath,
      invoiceItemId: item.invoiceItemId ?? 0,
      total: item.unitPrice * item.quantity,
    }));

    setRefundState({
      invoiceNumber: request.invoiceNumber,
      selectedItems: invoiceItems,
      currentStep: RefundStep.REFUND_METHOD_SELECTION,
    });

    onClose();
    navigate(`/refund-process?invoice=${request.invoiceNumber}`);
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "Date not available";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "Invalid date";
    }
  };

  useEffect(() => {
    if (isOpen && employee?.id) {
      loadRequests();
    }
  }, [isOpen, employee?.id]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent
        mx={4}
        bg={cardBg}
        borderRadius="16px"
        boxShadow="xl"
        border="1px solid"
        borderColor={borderColor}
      >
        <ModalHeader bg={headerBg} borderTopRadius="16px" py={6} pr={16}>
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <Box p={2} bg="blue" borderRadius="12px" color="white">
                <Icon as={Package} boxSize={6} />
              </Box>
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="darkBlue">
                  My Refund Requests
                </Text>
                <Text fontSize="sm" color="gray" mt={1}>
                  Manage your active refund requests
                </Text>
              </Box>
            </HStack>
            <Button
              leftIcon={<RefreshCw size={18} />}
              onClick={loadRequests}
              isLoading={loading}
              variant="outline"
              borderColor="blue"
              color="blue"
              _hover={{
                bg: "lightBlue",
                color: "white",
                borderColor: "lightBlue",
              }}
              size="md"
              borderRadius="12px"
              mr={4}
            >
              Refresh
            </Button>
          </Flex>
        </ModalHeader>
        <ModalCloseButton
          size="lg"
          color="darkBlue"
          _hover={{ bg: "lightGray" }}
          top={6}
          right={4}
        />

        <ModalBody maxH="70vh" overflowY="auto" p={6}>
          {loading ? (
            <Center py={16}>
              <VStack spacing={4}>
                <Spinner size="xl" color="blue" thickness="4px" />
                <Text color="gray" fontSize="md">
                  Loading your requests...
                </Text>
              </VStack>
            </Center>
          ) : requests.length === 0 ? (
            <Center py={16}>
              <VStack spacing={4}>
                <Box p={6} bg="lightGray" borderRadius="full">
                  <Icon as={AlertCircle} boxSize={12} color="gray" />
                </Box>
                <VStack spacing={2}>
                  <Text fontSize="lg" fontWeight="semibold" color="darkBlue">
                    No Active Requests
                  </Text>
                  <Text color="gray" textAlign="center" maxW="400px">
                    You don't have any active refund requests at the moment. All
                    your requests have been completed or cancelled.
                  </Text>
                </VStack>
              </VStack>
            </Center>
          ) : (
            <VStack spacing={6} align="stretch">
              {requests.map((request, index) => (
                <Box
                  key={request.requestId}
                  p={6}
                  bg={cardBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="16px"
                  boxShadow="md"
                  _hover={{
                    boxShadow: "lg",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s ease"
                >
                  {/* Header Section */}
                  <Flex justify="space-between" align="start" mb={4}>
                    <VStack align="start" spacing={2}>
                      <HStack spacing={3}>
                        <Text fontSize="lg" fontWeight="bold" color="darkBlue">
                          Invoice #{request.invoiceNumber}
                        </Text>
                        <Badge
                          colorScheme={getStatusColor(request.status)}
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="semibold"
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <Icon
                            as={getStatusIcon(request.status)}
                            boxSize={3}
                          />
                          {request.status}
                        </Badge>
                      </HStack>
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" color="blue" fontWeight="medium">
                          Request ID: #{request.requestId}
                        </Text>
                        <HStack spacing={2} color="gray">
                          <Icon as={Calendar} boxSize={4} />
                          <Text fontSize="sm">
                            {formatDateTime(request.createdAt)}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>

                    <HStack spacing={2}>
                      <Button
                        size="sm"
                        variant="outline"
                        borderColor="red"
                        color="red"
                        onClick={() => handleRemove(request.requestId)}
                        leftIcon={<Trash2 size={16} />}
                        _hover={{
                          bg: "red",
                          color: "white",
                        }}
                        borderRadius="10px"
                      >
                        Remove
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        color="red"
                        onClick={() => handleCancel(request)}
                        isDisabled={request.status?.toUpperCase() !== "PENDING"}
                        _hover={{
                          bg: "red",
                          color: "white",
                        }}
                        borderRadius="10px"
                      >
                        Cancel
                      </Button>

                      {request.status?.toUpperCase() === "APPROVED" && (
                        <Button
                          size="sm"
                          bg="blue"
                          color="white"
                          onClick={() => handleContinue(request)}
                          _hover={{
                            bg: "lightBlue",
                          }}
                          borderRadius="10px"
                          px={6}
                        >
                          Continue
                        </Button>
                      )}
                    </HStack>
                  </Flex>

                  <Divider borderColor={borderColor} />

                  {/* Items Section */}
                  <Box mt={4}>
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      color="darkBlue"
                      mb={3}
                    >
                      Items ({request.items.length})
                    </Text>
                    <Grid
                      templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                      gap={4}
                    >
                      {request.items.map((item, idx) => (
                        <HStack
                          key={idx}
                          spacing={4}
                          p={3}
                          bg="skyBlue"
                          borderRadius="12px"
                          border="1px solid"
                          borderColor="lightBlue"
                        >
                          <Image
                            src={`http://localhost:8080/api/admin/refund-requests/image/${item.photoPath}`}
                            boxSize="60px"
                            borderRadius="10px"
                            border="2px solid"
                            borderColor="white"
                            objectFit="cover"
                            fallbackSrc="https://via.placeholder.com/60x60?text=No+Image"
                          />
                          <VStack align="start" spacing={1} flex={1}>
                            <Text
                              fontWeight="semibold"
                              fontSize="sm"
                              color="darkBlue"
                              noOfLines={1}
                            >
                              {item.productName}
                            </Text>
                            <HStack spacing={4} fontSize="xs" color="gray">
                              <Text>Qty: {item.quantity}</Text>
                              <Text>•</Text>
                              <Text noOfLines={1}>Reason: {item.reason}</Text>
                            </HStack>
                          </VStack>
                        </HStack>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              ))}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RefundDetailsModal;
