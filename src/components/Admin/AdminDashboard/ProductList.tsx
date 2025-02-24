import { HStack, Text, VStack } from "@chakra-ui/react";
import useProductOrderQuantities from "../../../hooks/useProductOrderQuantities";
import ProductCard from "./ProductCard";

const Message = ({ message }: { message: string }) => {
  return (
    <Text textAlign="center" fontSize={20} fontWeight="bold" my={8}>
      {message}
    </Text>
  );
};

const ProductList = () => {
  const { data: salesData, error, isLoading } = useProductOrderQuantities();

  if (error) return <Message message={error.message} />;

  if (isLoading) return <Message message="Loading, please wait..." />;

  return (
    <>
      <HStack fontWeight="bold" padding={{ base: 4, lg: 6 }}>
        <Text width="full" marginLeft={12}>
          Item
        </Text>
        <Text
          minWidth={"18%"}
          maxWidth={"20%"}
          textAlign="center"
          fontWeight="bold"
        >
          Orders
        </Text>
        <Text minWidth={"18%"} maxWidth={"20%"} textAlign="center">
          PPU
        </Text>
        <Text
          minWidth={"18%"}
          maxWidth={"20%"}
          textAlign="center"
          fontWeight="bold"
        >
          Revenue
        </Text>
      </HStack>
      {salesData && salesData.length > 0 ? (
        <VStack spacing={2.5} paddingX={{ base: 2, lg: 4 }} marginBottom={6}>
          {salesData.map((data, index) => (
            <ProductCard key={index} data={data} />
          ))}
        </VStack>
      ) : (
        <Message message="No sales data available" />
      )}
    </>
  );
};

export default ProductList;
