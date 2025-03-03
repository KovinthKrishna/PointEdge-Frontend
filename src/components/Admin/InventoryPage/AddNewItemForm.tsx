import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  VStack,
} from "@chakra-ui/react";
import useAddProduct from "../../../hooks/useAddProduct";
import useProductFormErrorStore from "../../../store/useProductFormErrorStore";
import useProductFormStore from "../../../store/useProductFormStore";
import BarcodeButton from "../../BarcodeButton";
import FormField from "./FormField";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import ProductImageUpload from "./ProductImageUpload";

const AddNewItemForm = () => {
  const resetFormData = useProductFormStore((s) => s.resetFormData);
  const resetFormError = useProductFormErrorStore((s) => s.resetFormError);

  const addProduct = useAddProduct();

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
          <FormSelect name="brand" />
        </FormField>
        <FormField name="category">
          <FormSelect name="category" />
        </FormField>
        <FormField name="price">
          <FormInput name="price" />
        </FormField>
        <HStack color="white" width="full">
          <Button
            bgColor="blue"
            _hover={{ bgColor: "darkBlue" }}
            onClick={() => addProduct(false)}
          >
            Save
          </Button>
          <Button
            bgColor="blue"
            _hover={{ bgColor: "darkBlue" }}
            onClick={() => {
              resetFormData();
              resetFormError();
            }}
          >
            Clear
          </Button>
          <Button
            bgColor="blue"
            _hover={{ bgColor: "darkBlue" }}
            onClick={() => addProduct(true)}
          >
            Save & Hide
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default AddNewItemForm;
