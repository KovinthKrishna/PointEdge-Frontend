import { VStack } from "@chakra-ui/react";
import useCartStore from "../../store/useCartStore";
import CartProductCard from "./CartProductCard";

const CartList = () => {
  const orderItems = useCartStore((s) => s.orderItems);

  return (
    <VStack
      width="full"
      spacing={4}
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
      height="full"
      justifyContent="start"
    >
      {orderItems.map((orderItem) => (
        <CartProductCard key={orderItem.product.id} orderItem={orderItem} />
      ))}
    </VStack>
  );
};

export default CartList;
