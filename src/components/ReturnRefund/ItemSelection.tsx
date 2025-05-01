import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  Text,
  Heading,
  Divider,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {
  Invoice,
  InvoiceItem,
} from "../../pages/ReturnAndRefundpage/ReturnAndRefundpage";
import priceFormatter from "../../utils/priceFormatter";
import { useNavigate } from "react-router-dom";

interface ItemSelectionProps {
  invoiceData: Invoice;
  selectedItems: InvoiceItem[];
  onSubmit: (selectedItems: InvoiceItem[]) => void;
  onCancel: () => void;
}

const ItemSelection: React.FC<ItemSelectionProps> = ({
  invoiceData,
  onSubmit,
  selectedItems,
}) => {
  const [items, setItems] = useState<InvoiceItem[]>(selectedItems);

  const handleQuantityChange = (index: number, value: number) => {
    const updated = [...items];
    const original = invoiceData.items[index];
    const returnQty = Math.min(value, original.quantity);

    updated[index].returnQuantity = returnQty;
    updated[index].refundAmount = returnQty * updated[index].price;

    setItems(updated);
  };

  const handleSubmit = () => {
    const selected = items.filter((item) => item.returnQuantity > 0);
    onSubmit(selected);
  };

  const totalRefund = items.reduce(
    (sum, item) => sum + (item.refundAmount || 0),
    0
  );
  const navigate = useNavigate();

  useEffect(() => {
    setItems(selectedItems);
  }, [selectedItems]);

  console.log("Invoice keys:", Object.keys(invoiceData));

  return (
    <Box p={6} borderRadius="xl" boxShadow="md" bg="white">
      <Heading size="md" mb={2}>
        Return Items from Invoice
      </Heading>

      <Flex mb={4}>
        <Box>
          <Text fontWeight="medium">
            Invoice Number: {invoiceData.invoiceNumber}
          </Text>
          <Text fontWeight="medium">Date: {invoiceData.date}</Text>
        </Box>
        <Spacer />
        <Box textAlign="right">
          <Text fontWeight="semibold" fontSize="lg" color="teal.600">
            Total Refund: {priceFormatter(totalRefund)}
          </Text>
        </Box>
      </Flex>

      <Divider mb={4} />

      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th isNumeric>Qty Bought</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Return Qty</Th>
            <Th isNumeric>Refund</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, index) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td isNumeric>{item.quantity}</Td>
              <Td isNumeric>{priceFormatter(item.price)}</Td>
              <Td isNumeric>
                <NumberInput
                  min={0}
                  max={item.quantity}
                  value={item.returnQuantity}
                  onChange={(valueString) =>
                    handleQuantityChange(index, parseInt(valueString) || 0)
                  }
                  size="sm"
                  width="80px"
                >
                  <NumberInputField textAlign="center" />
                </NumberInput>
              </Td>
              <Td isNumeric>{priceFormatter(item.refundAmount)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justifyContent="flex-end" mt={6} gap={3}>
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          _hover={{
            bg: "red",
            color: "white",
            borderColor: "darkBlue",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          color="white"
          bg="darkBlue"
          border="2px"
          onClick={handleSubmit}
          isDisabled={totalRefund <= 0}
        >
          Proceed to Refund Method
        </Button>
      </Flex>
    </Box>
  );
};

export default ItemSelection;
