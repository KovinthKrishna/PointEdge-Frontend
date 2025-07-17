import React from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";

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

interface Props {
  request: RefundRequestViewDTO;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const RefundRequestDetailsModal: React.FC<Props> = ({
  request,
  onClose,
  onApprove,
  onReject,
}) => {
  return (
    <Modal isOpen={true} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Refund Request Details</ModalHeader>
        <ModalBody>
          <Text>
            <strong>Invoice:</strong> {request.invoiceNumber}
          </Text>
          <Text>
            <strong>Refund Method:</strong> {request.refundMethod}
          </Text>
          <Text>
            <strong>Total Refund:</strong> Rs. {request.totalRefundAmount}
          </Text>
          <Text>
            <strong>Created At:</strong>{" "}
            {new Date(request.createdAt).toLocaleString()}
          </Text>
          <Divider my={3} />
          <Heading size="sm" mb={2}>
            Items:
          </Heading>
          <VStack spacing={3} align="stretch">
            {request.items.map((item) => (
              <Box key={item.itemId} borderWidth="1px" borderRadius="md" p={3}>
                <Text>
                  <strong>Product:</strong> {item.productName}
                </Text>
                <Text>
                  <strong>Quantity:</strong> {item.quantity}
                </Text>
                <Text>
                  <strong>Reason:</strong> {item.reason}
                </Text>
                {item.photoPath && (
                  <Image
                    src={`http://localhost:8080/api/image/${item.photoPath}`}
                    alt="Return Item"
                    maxW="200px"
                    mt={2}
                    borderRadius="md"
                  />
                )}
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              colorScheme="blue"
              bg="darkBlue"
              color="white"
              _hover={{ bg: "blue" }}
              onClick={onApprove}
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
              onClick={onReject}
            >
              Reject
            </Button>
            <Button onClick={onClose}>Close</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RefundRequestDetailsModal;
