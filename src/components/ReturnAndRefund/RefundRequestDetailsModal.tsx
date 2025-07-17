import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
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
  Badge,
  Grid,
  GridItem,
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
    <Modal isOpen={true} onClose={onClose} size="2xl">
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent mx={4} maxH="90vh">
        <ModalHeader bg="darkBlue" color="white" borderTopRadius="md" py={4}>
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="bold">
              Refund Request Details
            </Text>
            <Badge
              colorScheme="blue"
              variant="outline"
              bg="white"
              color="darkBlue"
            >
              ID: {request.id}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody p={6} overflowY="auto">
          {/* Request Summary */}
          <Box bg="skyBlue" p={4} borderRadius="md" mb={4}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Text fontSize="sm" color="gray.600" mb={1}>
                  Invoice Number
                </Text>
                <Text fontWeight="bold" color="darkBlue">
                  {request.invoiceNumber}
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="sm" color="gray.600" mb={1}>
                  Refund Method
                </Text>
                <Badge colorScheme="blue" variant="solid" bg="blue">
                  {request.refundMethod}
                </Badge>
              </GridItem>
              <GridItem>
                <Text fontSize="sm" color="gray.600" mb={1}>
                  Total Refund Amount
                </Text>
                <Text fontWeight="bold" fontSize="lg" color="green">
                  Rs. {request.totalRefundAmount.toLocaleString()}
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="sm" color="gray.600" mb={1}>
                  Created At
                </Text>
                <Text fontWeight="semibold" color="darkBlue">
                  {new Date(request.createdAt).toLocaleDateString()} at{" "}
                  {new Date(request.createdAt).toLocaleTimeString()}
                </Text>
              </GridItem>
            </Grid>
          </Box>

          <Divider my={4} borderColor="gray.300" />

          {/* Items Section */}
          <Box>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color="darkBlue">
                Return Items
              </Heading>
              <Badge colorScheme="blue" variant="outline">
                {request.items.length} item{request.items.length > 1 ? "s" : ""}
              </Badge>
            </Flex>

            <VStack spacing={4} align="stretch">
              {request.items.map((item, index) => (
                <Box
                  key={item.itemId}
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="lg"
                  p={4}
                  bg="white"
                  shadow="sm"
                  _hover={{ shadow: "md" }}
                  transition="shadow 0.2s"
                >
                  <Flex direction={{ base: "column", md: "row" }} gap={4}>
                    {/* Item Image */}
                    {item.photoPath && (
                      <Box flexShrink={0}>
                        <Image
                          src={`http://localhost:8080/api/image/${item.photoPath}`}
                          alt={`Return item ${item.productName}`}
                          maxW="120px"
                          maxH="120px"
                          borderRadius="md"
                          objectFit="cover"
                          border="1px solid"
                          borderColor="gray.200"
                          fallbackSrc="https://via.placeholder.com/120x120?text=No+Image"
                        />
                      </Box>
                    )}

                    {/* Item Details */}
                    <VStack align="start" flex={1} spacing={2}>
                      <Text fontWeight="bold" fontSize="lg" color="darkBlue">
                        {item.productName}
                      </Text>

                      <HStack spacing={4}>
                        <Box>
                          <Text fontSize="sm" color="gray.600">
                            Quantity
                          </Text>
                          <Badge colorScheme="blue" variant="outline">
                            {item.quantity}
                          </Badge>
                        </Box>
                      </HStack>

                      <Box>
                        <Text fontSize="sm" color="gray.600" mb={1}>
                          Return Reason
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.800"
                          bg="gray.50"
                          p={2}
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.200"
                        >
                          {item.reason}
                        </Text>
                      </Box>
                    </VStack>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        </ModalBody>

        <ModalFooter bg="lightGray" borderBottomRadius="md" p={4}>
          <HStack spacing={3} w="full" justify="end">
            <Button
              variant="outline"
              colorScheme="gray"
              onClick={onClose}
              _hover={{ bg: "gray.100" }}
            >
              Close
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={onReject}
              _hover={{
                bg: "red",
                color: "white",
                borderColor: "red",
              }}
            >
              Reject
            </Button>
            <Button
              bg="darkBlue"
              color="white"
              _hover={{ bg: "blue" }}
              _active={{ bg: "darkBlue" }}
              onClick={onApprove}
            >
              Approve
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RefundRequestDetailsModal;
