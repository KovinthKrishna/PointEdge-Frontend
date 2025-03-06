import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import useProductFormErrorStore from "../../../store/useProductFormErrorStore";

interface Props {
  name: "name" | "price" | "quantity" | "brand" | "category";
  children: ReactNode;
}

const FormField = ({ name, children }: Props) => {
  const errorMessage = useProductFormErrorStore((s) => s[name]);
  const label = name[0].toUpperCase() + name.slice(1);

  return (
    <FormControl isInvalid={errorMessage !== ""}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems={{ lg: "center" }}
        gap={{ base: 0, lg: 4 }}
      >
        <FormLabel margin={0} marginBottom={{ lg: 6 }}>
          {label} :
        </FormLabel>
        <Box minHeight={16} width={{ lg: 300 }}>
          {children}
          <FormErrorMessage margin={0} color="red">
            {errorMessage}
          </FormErrorMessage>
        </Box>
      </Flex>
    </FormControl>
  );
};

export default FormField;
