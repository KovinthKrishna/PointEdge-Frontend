import { HStack, Text, VStack } from "@chakra-ui/react";
import useProductOrderQuantities from "../../../hooks/useProductOrderQuantities";
import Pagination from "../../Pagination";
import StatusMessage from "../../StatusMessage";
import ProductCard from "./ProductCard";
import ProductListText from "./ProductListText";

const ProductList = () => {
  const { data: salesData, error, isLoading } = useProductOrderQuantities();

  if (error) return <StatusMessage message={error.message} />;

  if (isLoading) return <StatusMessage message="Loading, please wait..." />;

  return (
    <>
      <HStack fontWeight="bold" padding={{ base: 4, lg: 6 }}>
        <Text
          width="full"
          marginLeft={{ base: 10, md: 12 }}
          fontSize={{ base: 12, md: 16 }}
        >
          Item
        </Text>
        <ProductListText value="Orders" />
        <ProductListText value="PPU" />
        <ProductListText value="Revenue" />
      </HStack>
      {salesData && salesData.content.length > 0 ? (
        <>
          <VStack spacing={2.5} paddingX={{ base: 2, lg: 4 }} marginBottom={6}>
            {salesData.content.map((data, index) => (
              <ProductCard key={index} data={data} />
            ))}
          </VStack>
          <Pagination page={salesData.page} />
        </>
      ) : (
        <StatusMessage message="No sales data available" />
      )}
    </>
  );
};

export default ProductList;
