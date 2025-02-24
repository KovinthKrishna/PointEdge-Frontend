import { HStack, Image, Text } from "@chakra-ui/react";
import productImage from "../../../assets/product-image.png";
import { ProductOrderQuantity } from "../../../hooks/useProductOrderQuantities";
import priceFormatter from "../../../utils/priceFormatter";

interface Props {
  data: ProductOrderQuantity;
}

const ProductCard = ({ data }: Props) => {
  return (
    <HStack
      border="2px"
      borderColor="gray"
      borderRadius={8}
      padding={2}
      width="full"
      cursor={"pointer"}
      _hover={{ borderColor: "lightBlue" }}
    >
      <Image src={productImage} boxSize={10} />
      <Text width="full">{data.productName}</Text>
      <Text
        minWidth={"18%"}
        maxWidth={"20%"}
        textAlign="center"
        fontWeight="bold"
      >
        {data.totalQuantity}
      </Text>
      <Text minWidth={"18%"} maxWidth={"20%"} textAlign="center">
        {priceFormatter(data.pricePerUnit)}
      </Text>
      <Text
        minWidth={"18%"}
        maxWidth={"20%"}
        textAlign="center"
        fontWeight="bold"
      >
        {priceFormatter(data.totalQuantity * data.pricePerUnit)}
      </Text>
    </HStack>
  );
};

export default ProductCard;
