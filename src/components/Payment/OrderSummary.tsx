import React from "react";
import {
  VStack,
  Text,
  Input,
  Button,
  Divider,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";

interface OrderSummaryProps {
  orderDetails: {
    id?: number;
    customerId: number;
    customerName?: string;
    customerPhone?: string;
    itemId: number;
    discountId?: number | null;
    itemName?: string;
    datetime: string;
    amount: number;
    totalDiscount: number;
    total: number;
    currency: string;
    itemDiscount?: number | null;
    categoryDiscount?: number | null;
    loyaltyDiscount?: number | null;
    loyaltyTier?: string | null;
    pointsEarned?: number | null;
    orderId: string;
  };
  onApplyDiscount: (code: string) => void;
  onDisplayCustomerDetails: (code: string) => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderDetails,
  onApplyDiscount,
  onDisplayCustomerDetails,
  discountCode,
  setDiscountCode,
}) => {
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <VStack align="start" spacing={5} width="100%" height="100%">
      <Text fontSize="28px" fontWeight="bold" color="#002a45">
        Order Summary
      </Text>

      <Divider borderColor="#0085ca" borderWidth={"1px"} />

      <Flex justifyContent="space-between" width="100%" mt={2}>
        <Text fontSize="16px" color="#555">
          Amount
        </Text>
        <Flex direction="column" align="flex-end">
          <Text fontSize="20px" fontWeight="semibold">
            {orderDetails.currency} {formatCurrency(orderDetails.amount)}
          </Text>
          <Text fontSize="12px" color="#777">
            Including taxes
          </Text>
        </Flex>
      </Flex>

      <Flex width="100%" mt={2}>
        <Input
          placeholder="Phone number"
          color={"#627a88ff"}
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          borderRadius="md"
          borderColor="#ccc"
          flex="1"
          _focus={{
            borderColor: "#0085ca",
            boxShadow: "0 0 0 1px #0085ca",
          }}
        />
        <Button
          ml={2}
          bg="#002a45"
          color="white"
          _hover={{ bg: "#003b62" }}
          onClick={() => {
            onApplyDiscount(discountCode);
            onDisplayCustomerDetails(discountCode);
          }}
        >
          Apply
        </Button>
      </Flex>

      <Divider borderColor="#0085ca" borderWidth={"1px"} mt={4} />

      <Flex justifyContent="space-between" width="100%">
        <Text fontSize="16px" color="#555">
          Discount
        </Text>
        <Text fontSize="16px" fontWeight="medium">
          {orderDetails.currency} {formatCurrency(orderDetails.totalDiscount)}
        </Text>
      </Flex>

      <Flex justifyContent="space-between" width="100%" mt={1}>
        <Text fontSize="16px" fontWeight="bold">
          Total
        </Text>
        <Text fontSize="22px" fontWeight="bold" color="#002a45">
          {orderDetails.currency} {formatCurrency(orderDetails.total)}
        </Text>
      </Flex>

      <Flex justifyContent="space-between" width="100%" mt="auto" mb={4}>
        <Box
          bg="white"
          borderRadius="md"
          p={4}
          width="60%"
          height="110px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src="src/assets/Card.jpg"
            alt="Card Payment"
            fallbackSrc="https://via.placeholder.com/80x50?text=Card"
            width="80%"
            height="100px"
          />
        </Box>
        <Box
          bg="white"
          borderRadius="md"
          p={4}
          width="50%"
          height="110px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src="src/assets/Cash.jpg"
            alt="POS Payment"
            fallbackSrc="https://via.placeholder.com/80x50?text=POS"
            width="60%"
            height="100px"
          />
        </Box>
      </Flex>
    </VStack>
  );
};

export default OrderSummary;
