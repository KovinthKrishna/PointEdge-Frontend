import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Image,
  Divider,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
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
  const toast = useToast();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/refund-requests/pending"
      );
      setRequests(res.data);
    } catch (err) {
      toast({ title: "Failed to load refund requests", status: "error" });
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await axios.post(
        `http://localhost:8080/api/admin/refund-requests/${id}/approve`
      );
      toast({ title: "Request approved", status: "success" });
      fetchRequests();
    } catch {
      toast({ title: "Failed to approve", status: "error" });
    }
  };

  const handleReject = async (id: number) => {
    try {
      await axios.post(
        `http://localhost:8080/api/admin/refund-requests/${id}/reject`
      );
      toast({ title: "Request rejected", status: "info" });
      fetchRequests();
    } catch {
      toast({ title: "Failed to reject", status: "error" });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Pending Refund Requests
      </Heading>
      <VStack spacing={4} align="stretch">
        {requests.map((req) => (
          <Box key={req.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Text fontWeight="bold">Invoice: {req.invoiceNumber}</Text>
            <Text>Refund Method: {req.refundMethod}</Text>
            <Text>Total: Rs. {req.totalRefundAmount}</Text>
            <Text>Date: {new Date(req.createdAt).toLocaleString()}</Text>
            <Button size="sm" mt={2} onClick={() => setSelectedRequest(req)}>
              View Details
            </Button>
          </Box>
        ))}
      </VStack>
      {selectedRequest && (
        <RefundRequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={() => handleApprove(selectedRequest.id)}
          onReject={() => handleReject(selectedRequest.id)}
        />
      )}
    </Box>
  );
};

export default AdminRefundReviewPage;
