import { SimpleGrid } from "@chakra-ui/react";
import useExtractSecondPathSegment from "../hooks/useExtractSecondPathSegment";
import useProducts from "../hooks/useProducts";
import useProductsVisibilityStore from "../store/useProductsVisibilityStore";
import ProductCard from "./ProductCard";
import StatusMessage from "./StatusMessage";

const ProductList = () => {
  const path = useExtractSecondPathSegment();
  const isShowingHiddenProducts = useProductsVisibilityStore(
    (s) => s.isShowingHiddenProducts
  );
  const {
    data: products,
    error,
    isLoading,
  } = useProducts(isShowingHiddenProducts ? true : undefined);

  if (error) return <StatusMessage message={error.message} />;

  if (isLoading) return <StatusMessage message="Loading, please wait..." />;

  return products && products.length > 0 ? (
    <SimpleGrid
      columns={{ base: 2, md: 4, xl: 6 }}
      spacing={4}
      marginBottom={6}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isAdmin={path === "inventory"}
        />
      ))}
    </SimpleGrid>
  ) : (
    <StatusMessage message="No products available" />
  );
};

export default ProductList;
