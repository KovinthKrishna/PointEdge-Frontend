import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

interface ReturnItem {
  productId: number;
  quantity: number;
  reason: string;
  photoPath?: string;
}

interface RefundRequest {
  id: number;
  invoiceNumber: string;
  totalRefundAmount?: number;
  createdAt: string;
  status: string;
  items: ReturnItem[];
}

const AdminRefundRequestsPage = () => {
  const [requests, setRequests] = useState<RefundRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<RefundRequest | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/refund-requests/pending"
      );
      setRequests(response.data);
    } catch (error) {
      toast({ title: "Failed to load refund requests", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await axios.post(
        `http://localhost:8080/api/admin/refund-requests/${id}/approve`
      );
      toast({ title: `Request ${id} approved.`, status: "success" });
      fetchRequests();
    } catch (err) {
      toast({ title: `Failed to approve request ${id}`, status: "error" });
    }
  };

  const handleReject = async (id: number) => {
    try {
      await axios.post(
        `http://localhost:8080/api/admin/refund-requests/${id}/reject`
      );
      toast({ title: `Request ${id} rejected.`, status: "info" });
      fetchRequests();
    } catch (err) {
      toast({ title: `Failed to reject request ${id}`, status: "error" });
    }
  };

  const openDetails = (request: RefundRequest) => {
    setSelectedRequest(request);
    onOpen();
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Pending Refund Requests
      </Heading>
      {loading ? (
        <Spinner />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Invoice</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {requests.map((req) => (
              <Tr key={req.id}>
                <Td>{req.id}</Td>
                <Td>{req.invoiceNumber}</Td>
                <Td>{(req.totalRefundAmount ?? 0).toFixed(2)}</Td>
                <Td>{new Date(req.createdAt).toLocaleString()}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    bg="darkBlue"
                    color="white"
                    _hover={{ bg: "blue" }}
                    mr={2}
                    onClick={() => openDetails(req)}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {selectedRequest && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Refund Request #{selectedRequest.id}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold">
                Invoice #: {selectedRequest.invoiceNumber}
              </Text>
              <Text mb={4}>
                Total Refund:{" "}
                {(selectedRequest.totalRefundAmount ?? 0).toFixed(2)}
              </Text>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Product ID</Th>
                    <Th>Quantity</Th>
                    <Th>Reason</Th>
                    <Th>Photo</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedRequest.items.map((item, i) => (
                    <Tr key={i}>
                      <Td>{item.productId}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>{item.reason}</Td>
                      <Td>
                        {item.photoPath ? (
                          <Image
                            src={`http://localhost:8080/${item.photoPath}`}
                            boxSize="50px"
                            objectFit="cover"
                            alt="return"
                          />
                        ) : (
                          "No photo"
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                bg="darkBlue"
                color="white"
                _hover={{ bg: "blue" }}
                mr={3}
                onClick={() => {
                  handleApprove(selectedRequest.id);
                  onClose();
                }}
              >
                Approve
              </Button>
              <Button
                variant="outline"
                colorScheme="red"
                _hover={{
                  bg: "red",
                  color: "white",
                  borderColor: "red",
                }}
                onClick={() => {
                  handleReject(selectedRequest.id);
                  onClose();
                }}
              >
                Reject
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default AdminRefundRequestsPage;
