import { HStack, Text } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import useCartStore, { OrderItem } from "../../store/useCartStore";
import priceFormatter from "../../utils/priceFormatter";

const calculateTotal = (orderItems: OrderItem[]) => {
  return orderItems.reduce(
    (sum, orderItem) => sum + orderItem.pricePerUnit * orderItem.quantity,
    0
  );
};

interface PayButtonProps {
  onClick?: () => void;
}

const PayButton: React.FC<PayButtonProps> = ({ onClick }) => {
  const orderItems = useCartStore((s) => s.orderItems);

  return (
    <HStack
      as="button"
      bgColor="blue"
      _hover={{ bgColor: "darkBlue" }}
      _disabled={{ bgColor: "gray" }}
      width="full"
      justifyContent="space-between"
      paddingX={4}
      paddingY={2}
      borderRadius={8}
      color="white"
      disabled={orderItems.length === 0}
      onClick={onClick ? onClick : () => console.log(orderItems)}
    >
      <Text fontWeight="bold">
        {priceFormatter(calculateTotal(orderItems))}
      </Text>
      <HStack>
        <Text>Pay</Text>
        <FaChevronRight />
      </HStack>
    </HStack>
  );
};

export default PayButton;
