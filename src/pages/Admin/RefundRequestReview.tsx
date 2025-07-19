import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  useToast,
  Badge,
  Grid,
  GridItem,
  Flex,
  HStack,
  Container,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Card,
  CardBody,
  Divider,
  Icon,
} from "@chakra-ui/react";
import {
  FiRefreshCw,
  FiEye,
  FiClock,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";
import axiosInstance from "../../axiosConfig";
import RefundRequestDetailsModal from "../../components/ReturnAndRefund/RefundRequestDetailsModal";

interface ReturnedItem {
  itemId: number;
  productName: string;
  quantity: number;
  reason: string;
  photoPath?: string;
}

interface RefundRequestViewDTO {
  id: number;
  invoiceNumber: string;
  refundMethod: string;
  totalRefundAmount: number;
  createdAt: string;
  items: ReturnedItem[];
}

const AdminRefundReviewPage = () => {
  const [requests, setRequests] = useState<RefundRequestViewDTO[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<RefundRequestViewDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const toast = useToast();

  const fetchRequests = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) setIsRefreshing(true);
      const res = await axiosInstance.get("/admin/refund-requests/pending");
      setRequests(res.data);
      setIsLoading(false);
    } catch (err) {
      toast({
        title: "Failed to load refund requests",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    } finally {
      if (showRefreshIndicator) setIsRefreshing(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await axiosInstance.post(`/admin/refund-requests/${id}/approve`);
      toast({
        title: "Request Approved",
        description: "The refund request has been approved successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setSelectedRequest(null);
      fetchRequests();
    } catch {
      toast({
        title: "Failed to approve",
        description: "An error occurred while approving the request.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReject = async (id: number) => {
    try {
      await axiosInstance.post(`/admin/refund-requests/${id}/reject`);
      toast({
        title: "Request Rejected",
        description: "The refund request has been rejected.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      setSelectedRequest(null);
      fetchRequests();
    } catch {
      toast({
        title: "Failed to reject",
        description: "An error occurred while rejecting the request.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRefresh = () => {
    fetchRequests(true);
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(() => {
      fetchRequests();
    }, 30000); // Increased to 30 seconds for better performance
    return () => clearInterval(interval);
  }, []);

  const getTotalRefundAmount = () => {
    return requests.reduce((total, req) => total + req.totalRefundAmount, 0);
  };

  const getItemsCount = (items: ReturnedItem[]) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Flex justify="center" align="center" minH="400px">
          <VStack spacing={4}>
            <Spinner size="xl" color="darkBlue" thickness="4px" />
            <Text color="gray.600">Loading refund requests...</Text>
          </VStack>
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      {/* Header Section */}
      <Box mb={8}>
        <Flex justify="space-between" align="center" mb={4}>
          <VStack align="start" spacing={1}>
            <Heading size="xl" color="darkBlue">
              Refund Request Management
            </Heading>
            <Text color="gray.600">
              Review and manage pending refund requests
            </Text>
          </VStack>
          <Button
            leftIcon={<Icon as={FiRefreshCw} />}
            onClick={handleRefresh}
            isLoading={isRefreshing}
            loadingText="Refreshing"
            bg="darkBlue"
            color="white"
            _hover={{ bg: "blue" }}
            size="md"
          >
            Refresh
          </Button>
        </Flex>

        {/* Statistics Cards */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={4}
          mb={6}
        >
          <Card bg="skyBlue" borderLeft="4px solid" borderLeftColor="blue">
            <CardBody>
              <Flex align="center">
                <Icon as={FiFileText} color="blue" boxSize={6} mr={3} />
                <Box>
                  <Text fontSize="sm" color="gray.600">
                    Pending Requests
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="darkBlue">
                    {requests.length}
                  </Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>

          <Card bg="lightGray" borderLeft="4px solid" borderLeftColor="green">
            <CardBody>
              <Flex align="center">
                <Icon as={FiDollarSign} color="green" boxSize={6} mr={3} />
                <Box>
                  <Text fontSize="sm" color="gray.600">
                    Total Refund Amount
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="green">
                    Rs. {getTotalRefundAmount().toLocaleString()}
                  </Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>

          <Card bg="white" borderLeft="4px solid" borderLeftColor="darkBlue">
            <CardBody>
              <Flex align="center">
                <Icon as={FiClock} color="darkBlue" boxSize={6} mr={3} />
                <Box>
                  <Text fontSize="sm" color="gray.600">
                    Auto Refresh
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="darkBlue">
                    Every 30s
                  </Text>
                </Box>
              </Flex>
            </CardBody>
          </Card>
        </Grid>
      </Box>

      {/* Requests List */}
      {requests.length === 0 ? (
        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="300px"
          bg="skyBlue"
          borderRadius="lg"
        >
          <AlertIcon boxSize="40px" mr={0} color="blue" />
          <AlertTitle mt={4} mb={1} fontSize="lg" color="darkBlue">
            No Pending Requests
          </AlertTitle>
          <AlertDescription maxWidth="sm" color="gray.600">
            There are currently no refund requests pending approval. New
            requests will appear here automatically.
          </AlertDescription>
        </Alert>
      ) : (
        <VStack spacing={4} align="stretch">
          {requests.map((req) => (
            <Card
              key={req.id}
              variant="outline"
              borderColor="gray.200"
              _hover={{
                shadow: "md",
                borderColor: "blue",
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s"
              bg="white"
            >
              <CardBody p={6}>
                <Grid
                  templateColumns={{ base: "1fr", lg: "2fr 1fr auto" }}
                  gap={6}
                  alignItems="center"
                >
                  {/* Request Info */}
                  <Box>
                    <Flex align="center" mb={3}>
                      <Badge
                        colorScheme="blue"
                        variant="solid"
                        bg="darkBlue"
                        mr={3}
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        #{req.id}
                      </Badge>
                      <Text fontWeight="bold" fontSize="lg" color="darkBlue">
                        {req.invoiceNumber}
                      </Text>
                    </Flex>

                    <VStack align="start" spacing={2}>
                      <Flex wrap="wrap" gap={4}>
                        <HStack>
                          <Icon as={FiDollarSign} color="green" />
                          <Text fontSize="sm" color="gray.600">
                            Refund:
                          </Text>
                          <Text fontWeight="bold" color="green">
                            Rs. {req.totalRefundAmount.toLocaleString()}
                          </Text>
                        </HStack>

                        <HStack>
                          <Text fontSize="sm" color="gray.600">
                            Method:
                          </Text>
                          <Badge colorScheme="blue" variant="outline">
                            {req.refundMethod}
                          </Badge>
                        </HStack>

                        <HStack>
                          <Text fontSize="sm" color="gray.600">
                            Items:
                          </Text>
                          <Badge colorScheme="gray" variant="outline">
                            {getItemsCount(req.items)} items
                          </Badge>
                        </HStack>
                      </Flex>
                    </VStack>
                  </Box>

                  {/* Date Info */}
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Submitted
                    </Text>
                    <Text fontWeight="semibold" color="darkBlue">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(req.createdAt).toLocaleTimeString()}
                    </Text>
                  </Box>

                  {/* Actions */}
                  <VStack spacing={2}>
                    <Button
                      leftIcon={<Icon as={FiEye} />}
                      onClick={() => setSelectedRequest(req)}
                      bg="darkBlue"
                      color="white"
                      _hover={{ bg: "blue" }}
                      size="sm"
                      w="full"
                    >
                      View Details
                    </Button>
                  </VStack>
                </Grid>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}

      {/* Modal */}
      {selectedRequest && (
        <RefundRequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={() => handleApprove(selectedRequest.id)}
          onReject={() => handleReject(selectedRequest.id)}
        />
      )}
    </Container>
  );
};

export default AdminRefundReviewPage;
