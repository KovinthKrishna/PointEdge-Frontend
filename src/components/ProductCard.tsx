import { Box, Card, Image, Text, Tooltip } from "@chakra-ui/react";
import productImage from "../assets/product-image.png";
import Product from "../models/Product";
import { getProductImageUrl } from "../services/apiClient";
import useModalStore from "../store/useModalStore";
import priceFormatter from "../utils/priceFormatter";
import UpdateProduct from "./Admin/InventoryPage/UpdateProduct";

interface Props {
  product: Product;
  isAdmin: boolean;
}

const ProductCard = ({ product, isAdmin }: Props) => {
  const openUpdateProductModal = useModalStore((s) => s.openUpdateProductModal);

  return (
    <>
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
          onClick={
            isAdmin ? () => openUpdateProductModal(product.id) : undefined
          }
        >
          <Image
            src={
              product.imageName
                ? getProductImageUrl(product.imageName)
                : productImage
            }
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
      <UpdateProduct product={product} />
    </>
  );
};

export default ProductCard;
