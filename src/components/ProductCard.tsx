import { Box, Card, Image, Text, Tooltip } from "@chakra-ui/react";
import productImage from "../assets/product-image.png";
import Product from "../models/Product";
import priceFormatter from "../utils/priceFormatter";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Tooltip label={product.name} color="black" bgColor="lightGray">
      <Card
        opacity={product.hidden ? 0.6 : 1}
        paddingX={2}
        paddingY={4}
        borderRadius={10}
        alignItems="center"
        fontWeight="bold"
        border="2px solid transparent"
        _hover={{ borderColor: "darkBlue" }}
      >
        <Image
          src={productImage}
          aspectRatio={1}
          objectFit="contain"
          padding={2}
        />
        <Text>{priceFormatter(product.price)}</Text>
        <Box minHeight={9}>
          <Text fontSize={12} color="green"></Text>
          <Text fontSize={12} color="gray"></Text>
        </Box>
        <Text noOfLines={2} minHeight={12}>
          {product.name}
        </Text>
      </Card>
    </Tooltip>
  );
};

export default ProductCard;
