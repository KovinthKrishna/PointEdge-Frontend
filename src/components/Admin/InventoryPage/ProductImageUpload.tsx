import { Button, Image, VStack } from "@chakra-ui/react";
import productImage from "../../../assets/product-image.png";

const ProductImageUpload = () => {
  return (
    <VStack>
      <Image
        src={productImage}
        aspectRatio={1}
        objectFit="contain"
        border="2px"
        borderColor="darkBlue"
        borderRadius={12}
        maxWidth={250}
      />
      <Button
        variant="outline"
        color="darkBlue"
        border="2px"
        _hover={{ bg: "darkBlue", color: "white", borderColor: "darkBlue" }}
      >
        Upload a Image
      </Button>
    </VStack>
  );
};

export default ProductImageUpload;
