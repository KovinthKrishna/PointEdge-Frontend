import {
  Box,
  Card,
  HStack,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { ImBin } from "react-icons/im";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import productImage from "../../assets/product-image.png";
import { getProductImageUrl } from "../../services/apiClient";
import useCartStore, { OrderItem } from "../../store/useCartStore";
import theme from "../../theme";
import priceFormatter from "../../utils/priceFormatter";

const CartProductCard = ({ orderItem }: { orderItem: OrderItem }) => {
  const removeProduct = useCartStore((s) => s.removeProduct);
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);

  return (
    <Tooltip label={orderItem.product.name} color="black" bgColor="lightGray">
      <Card
        direction="row"
        width="full"
        color="darkBlue"
        alignItems="center"
        border="2px solid transparent"
        _hover={{ borderColor: "darkBlue" }}
      >
        <Image
          src={
            orderItem.product.imageName
              ? getProductImageUrl(orderItem.product.imageName)
              : productImage
          }
          boxSize={100}
          aspectRatio={1}
          objectFit="contain"
          padding={2}
        />
        <VStack width="full" justifyContent="space-between" padding={2}>
          <HStack
            width="full"
            justifyContent="space-between"
            alignItems="start"
          >
            <Text fontWeight="bold" noOfLines={2}>
              {orderItem.product.name}
            </Text>
            <VStack spacing={0} alignItems="end" minWidth="fit-content">
              <Text fontWeight="bold">
                {priceFormatter(orderItem.pricePerUnit)}
              </Text>
              <Box minHeight={9}>
                <Text fontSize={12} color="green"></Text>
                <Text fontSize={12} color="gray"></Text>
              </Box>
            </VStack>
          </HStack>
          <HStack width="full" justifyContent="space-between">
            <HStack>
              <IconButton
                aria-label="Decrease quantity"
                boxSize={10}
                borderRadius="full"
                icon={
                  <MdRemoveCircle size={32} color={theme.colors.darkBlue} />
                }
                onClick={() => decreaseQuantity(orderItem.product)}
                disabled={orderItem.quantity === 1}
              />
              <Text fontWeight="bold" minWidth={10} textAlign="center">
                {orderItem.quantity}
              </Text>
              <IconButton
                aria-label="Increase quantity"
                boxSize={10}
                borderRadius="full"
                icon={<MdAddCircle size={32} color={theme.colors.darkBlue} />}
                onClick={() => increaseQuantity(orderItem.product)}
                disabled={
                  orderItem.quantity === orderItem.product.stockQuantity
                }
              />
            </HStack>
            <IconButton
              aria-label="Remove from cart"
              boxSize={10}
              borderRadius="full"
              icon={<ImBin size={24} color={theme.colors.gray} />}
              onClick={() => removeProduct(orderItem.product)}
            />
          </HStack>
        </VStack>
      </Card>
    </Tooltip>
  );
};

export default CartProductCard;
