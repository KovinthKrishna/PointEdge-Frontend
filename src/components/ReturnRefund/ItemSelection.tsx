import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface InvoiceData {
  id: string;
  date: string;
  items: InvoiceItem[];
  total: number;
}

interface SelectedItem extends InvoiceItem {
  returnQuantity: number;
  refundAmount: number;
}

interface ItemSelectionProps {
  invoiceData: InvoiceData | null;
  onSubmit: (items: SelectedItem[]) => void;
  onCancel: () => void;
}

const ItemSelection: React.FC<ItemSelectionProps> = ({
  invoiceData,
  onSubmit,
  onCancel,
}) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [totalRefundAmount, setTotalRefundAmount] = useState<number>(0);
  const toast = useToast();

  // Initialize selected items with zero return quantities
  useEffect(() => {
    // Add null check before accessing invoiceData
    if (!invoiceData) return;

    const initialItems = invoiceData.items.map((item) => ({
      ...item,
      returnQuantity: 0,
      refundAmount: 0,
    }));
    setSelectedItems(initialItems);
  }, [invoiceData]);

  const handleQuantityChange = (id: string, value: number) => {
    const updatedItems = selectedItems.map((item) => {
      if (item.id === id) {
        // Ensure we don't return more than purchased
        const returnQuantity = Math.min(value, item.quantity);
        const refundAmount = returnQuantity * item.price;
        return { ...item, returnQuantity, refundAmount };
      }
      return item;
    });

    setSelectedItems(updatedItems);
    calculateTotalRefund(updatedItems);
  };

  const calculateTotalRefund = (items: SelectedItem[]) => {
    const total = items.reduce((sum, item) => sum + item.refundAmount, 0);
    setTotalRefundAmount(total);
  };

  const handleSubmit = () => {
    const itemsToReturn = selectedItems.filter(
      (item) => item.returnQuantity > 0
    );

    if (itemsToReturn.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to return",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSubmit(itemsToReturn);
  };

  // Early return if invoiceData is null
  if (!invoiceData) {
    return (
      <Box p={4}>
        <Text>No invoice data available</Text>
        <Button onClick={onCancel} variant="outline">
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading size="md" mb={4}>
        Select Items to Return
      </Heading>
      <Text mb={4}>
        Invoice: {invoiceData.id} | Date: {invoiceData.date}
      </Text>

      <Table variant="simple" mb={6}>
        <Thead>
          <Tr>
            <Th>Item</Th>
            <Th>Purchased Qty</Th>
            <Th>Return Qty</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Refund Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {selectedItems.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.quantity}</Td>
              <Td>
                <NumberInput
                  min={0}
                  max={item.quantity}
                  value={item.returnQuantity}
                  onChange={(_, value) => handleQuantityChange(item.id, value)}
                  size="sm"
                  maxW={20}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Td>
              <Td isNumeric>${item.price.toFixed(2)}</Td>
              <Td isNumeric>${item.refundAmount.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontWeight="bold">
          Total Refund Amount: ${totalRefundAmount.toFixed(2)}
        </Text>
      </Flex>

      <Flex justifyContent="flex-end" gap={3}>
        <Button
          onClick={onCancel}
          variant="outline"
          backgroundColor="gray.100"
          color="gray.800"
          _hover={{ backgroundColor: "gray.200" }}
        >
          Cancel
        </Button>
        <Button
          backgroundColor="#4A5568"
          color="white"
          _hover={{ backgroundColor: "#2D3748" }}
          onClick={handleSubmit}
          isDisabled={totalRefundAmount <= 0}
        >
          Proceed to Refund
        </Button>
      </Flex>
    </Box>
  );
};

export default ItemSelection;
