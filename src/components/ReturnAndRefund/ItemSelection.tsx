import React from "react";
import {
  Box,
  Button,
  VStack,
  useToast,
  Heading,
  HStack,
  Text,
  Divider,
  useColorModeValue,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { Invoice, InvoiceItem } from "../../models/Invoice";
import ItemTable from "./ItemTable";
import { useNavigate } from "react-router-dom";

interface ItemSelectionProps {
  invoiceData: Invoice;
  selectedItems: InvoiceItem[];
  onSubmit: (items: InvoiceItem[]) => void;
  onCancel: () => void;
}

const ItemSelection: React.FC<ItemSelectionProps> = ({
  invoiceData,
  selectedItems,
  onSubmit,
}) => {
  const [items, setItems] = React.useState<InvoiceItem[]>(selectedItems);
  const toast = useToast();
  const navigate = useNavigate();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headingColor = useColorModeValue("blue.700", "blue.300");

  const handleSubmit = () => {
    const incompleteRows = items.filter((item) => {
      const startedFilling =
        item.returnQuantity > 0 ||
        (item.reason && item.reason.trim() !== "") ||
        item.returnPhoto;

      const incomplete =
        startedFilling &&
        (!item.returnQuantity ||
          item.returnQuantity <= 0 ||
          !item.reason?.trim() ||
          !item.returnPhoto);

      return incomplete;
    });

    if (incompleteRows.length > 0) {
      toast({
        title: "Incomplete Item Detected",
        description:
          "Each item you start filling must include quantity, reason, and photo.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const filtered = items.filter((item) => item.returnQuantity > 0);
    onSubmit(filtered);
  };

  const handleReset = () => {
    const resetItems = items.map((item) => ({
      ...item,
      returnQuantity: 0,
      refundAmount: 0,
      reason: "",
      returnPhoto: undefined,
      photoPreviewUrl: undefined,
    }));
    setItems(resetItems);

    toast({
      title: "Selection Reset",
      description: "All selections have been cleared.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const selectedItemsCount = items.filter(
    (item) => item.returnQuantity > 0
  ).length;
  const totalRefund = items.reduce(
    (sum, item) => sum + (item.refundAmount || 0),
    0
  );

  return (
    <Box
      bg={bgColor}
      p={8}
      rounded="xl"
      shadow="xl"
      border="1px solid"
      borderColor={borderColor}
      maxW="full"
      overflow="hidden"
    >
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <VStack align="start" spacing={1}>
            <Heading size="lg" color={headingColor} fontWeight="bold">
              Invoice Items
            </Heading>
            <Text fontSize="md" color="gray.600">
              Invoice #{invoiceData.invoiceNumber}
            </Text>
          </VStack>

          <HStack spacing={4}>
            <VStack spacing={0}>
              <Text fontSize="sm" color="gray.500">
                Items Selected
              </Text>
              <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
                {selectedItemsCount}
              </Badge>
            </VStack>
            <VStack spacing={0}>
              <Text fontSize="sm" color="gray.500">
                Total Refund
              </Text>
              <Badge colorScheme="green" fontSize="md" px={3} py={1}>
                Rs. {totalRefund.toFixed(2)}
              </Badge>
            </VStack>
          </HStack>
        </Flex>

        <Divider />

        <ItemTable
          items={items}
          onItemChange={setItems}
          header1="Product"
          header2="Qty Purchased"
          header3="Return Qty"
          header4="Unit Price"
          header5="Refund"
          header6="Reason"
          header7="Photo"
        />

        <Divider />

        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Button
            colorScheme="blue"
            bg="darkBlue"
            color="white"
            _hover={{ bg: "blue" }}
            onClick={handleReset}
          >
            Reset All
          </Button>

          <HStack spacing={3}>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={handleCancel}
              _hover={{
                bg: "red",
                color: "white",
                borderColor: "red",
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              bg="darkBlue"
              color="white"
              _hover={{ bg: "blue" }}
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ItemSelection;
