import { WarningIcon } from "@chakra-ui/icons/Warning";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FiClock,
  FiDollarSign,
  FiEye,
  FiFileText,
  FiRefreshCw,
} from "react-icons/fi";
import RefundRequestDetailsModal from "../../components/ReturnAndRefund/RefundRequestDetailsModal";
import { ReturnedItem, RefundRequestViewDTO } from "../../models/ReturnTypes";
import { useRefundStore } from "../../store/useRefundRequestStore";
import verifyService from "../../services/verifyService";
import axiosInstance from "../../services/verifyService";

const AdminRefundReviewPage = () => {
  const [requests, setRequests] = useState<RefundRequestViewDTO[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<RefundRequestViewDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const toast = useToast();
  const { setRefundRequestId } = useRefundStore();

  const fetchRequests = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) setIsRefreshing(true);
      const res = await verifyService.get("/admin/refund-requests/pending");
      setRequests(res.data);
      setIsLoading(false);
      console.log("Fetched refund requests:", res.data[0].id);
      if (res.data.length > 0) {
        setRefundRequestId(res.data[0].id);
      }
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

  const handleApprove = async (id: number, adminId: number) => {
    try {
      await axiosInstance.post(`/admin/refund-requests/approve-request`, null, {
        params: { requestId: id, adminId: 1 },
      });

      toast({
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box
            bg="darkBlue"
            color="white"
            px={4}
            py={3}
            borderRadius="md"
            boxShadow="lg"
            maxW="sm"
            mx="auto"
          >
            <HStack spacing={3}>
              <Icon as={FiDollarSign} color="white" boxSize={5} />
              <Box>
                <Text fontWeight="bold" fontSize="md">
                  Request Approved
                </Text>
                <Text fontSize="sm">Refund request approved successfully.</Text>
              </Box>
            </HStack>
          </Box>
        ),
      });

      setSelectedRequest(null);
      fetchRequests();
    } catch {
      // handle error toast if needed
    }
  };

  const handleReject = async (id: number) => {
    try {
      await verifyService.post(`/admin/refund-requests/reject-request`, null, {
        params: { requestId: id },
      });

      toast({
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box
            bg="darkBlue"
            color="white"
            px={4}
            py={3}
            borderRadius="md"
            boxShadow="lg"
            maxW="sm"
            mx="auto"
          >
            <HStack spacing={3}>
              <Icon as={FiEye} color="white" boxSize={5} />
              <Box>
                <Text fontWeight="bold" fontSize="md">
                  Request Rejected
                </Text>
                <Text fontSize="sm">Refund request rejected successfully.</Text>
              </Box>
            </HStack>
          </Box>
        ),
      });

      setSelectedRequest(null);
      fetchRequests();
    } catch {
      toast({
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box
            bg="darkBlue"
            color="white"
            px={4}
            py={3}
            borderRadius="md"
            boxShadow="lg"
            maxW="sm"
            mx="auto"
          >
            <HStack spacing={3}>
              <Icon as={WarningIcon} color="white" boxSize={5} />
              <Box>
                <Text fontWeight="bold" fontSize="md">
                  Error
                </Text>
                <Text fontSize="sm">
                  Something went wrong. Please try again.
                </Text>
              </Box>
            </HStack>
          </Box>
        ),
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
    }, 30000);
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
                            Status:
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
          onApprove={() => handleApprove(selectedRequest.id, 1)}
          onReject={() => handleReject(selectedRequest.id)}
        />
      )}
    </Container>
  );
};

export default AdminRefundReviewPage;
