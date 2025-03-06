import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import BarcodeButton from "../../BarcodeButton";
import BrandSelector from "./BrandSelector";
import CategorySelector from "./CategorySelector";
import FormField from "./FormField";
import FormInput from "./FormInput";
import ProductImageUpload from "./ProductImageUpload";

interface Props {
  children: ReactNode;
}

const ProductForm = ({ children }: Props) => {
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justifyContent="center"
      alignItems={{ lg: "center" }}
      gap={{ base: 4, lg: 8 }}
      mb={{ base: 8, lg: 12 }}
    >
      <ProductImageUpload />
      <VStack minWidth="fit-content" spacing={{ base: 1, lg: 2 }}>
        <FormControl>
          <Flex
            direction="row"
            justifyContent={{ lg: "space-between" }}
            gap={4}
            alignItems="center"
            marginBottom={4}
          >
            <FormLabel margin={0}>Barcode :</FormLabel>
            <Box width={{ lg: 300 }}>
              <BarcodeButton />
            </Box>
          </Flex>
        </FormControl>
        <FormField name="name">
          <FormInput name="name" />
        </FormField>
        <FormField name="quantity">
          <FormInput name="quantity" />
        </FormField>
        <FormField name="brand">
          <BrandSelector />
        </FormField>
        <FormField name="category">
          <CategorySelector />
        </FormField>
        <FormField name="price">
          <FormInput name="price" />
        </FormField>
        <HStack color="white" width="full">
          {children}
        </HStack>
      </VStack>
    </Flex>
  );
};

export default ProductForm;
