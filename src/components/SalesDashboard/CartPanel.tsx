import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { MdRemoveShoppingCart } from "react-icons/md";
import useCartStore from "../../store/useCartStore";
import theme from "../../theme";
import CartList from "./CartList";
import PayButton from "./PayButton";

const CartPanel = () => {
  const orderItems = useCartStore((s) => s.orderItems);
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <Box height="100vh" paddingY={10} position="sticky" top={0}>
      <VStack
        height="full"
        border="4px"
        borderColor="darkBlue"
        borderRadius={24}
        paddingX={{ base: 3, xl: 6 }}
        paddingY={8}
        spacing={6}
        justifyContent="space-between"
      >
        <HStack width="full" justifyContent="space-between">
          <Text fontWeight="bold" fontSize={32} color="darkBlue">
            New Order
          </Text>
          <IconButton
            aria-label="Clear cart"
            boxSize={12}
            borderRadius="full"
            icon={
              <MdRemoveShoppingCart size={30} color={theme.colors.darkBlue} />
            }
            onClick={clearCart}
            disabled={orderItems.length === 0}
          />
        </HStack>
        <CartList />
        <PayButton />
      </VStack>
    </Box>
  );
};

export default CartPanel;
