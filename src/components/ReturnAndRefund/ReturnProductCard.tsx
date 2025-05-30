import { Box, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import Product from "../../models/Product";

type Props = {
  product: Product;
  onSelect: () => void;
};

const ReturnProductCard = ({ product, onSelect }: Props) => {
  const bg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      bg={bg}
      borderRadius="md"
      p={3}
      cursor="pointer"
      _hover={{ boxShadow: "md", bg: "gray.200" }}
      onClick={onSelect}
    >
      <VStack spacing={2}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          boxSize="80px"
          objectFit="contain"
        />
        <Text fontSize="sm" textAlign="center">
          {product.name}
        </Text>
        <Text fontWeight="bold" color="teal.500">
          Rs. {product.price.toFixed(2)}
        </Text>
      </VStack>
    </Box>
  );
};

export default ReturnProductCard;
