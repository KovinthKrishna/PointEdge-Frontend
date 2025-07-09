import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  SimpleGrid,
  Text,
  Button,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import Product from "../../models/Product";

interface Props {
  onSelectReplacement: (product: Product) => void;
}

const ReturnProductSelector: React.FC<Props> = ({ onSelectReplacement }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <Box>
      <Heading size="md" mb={4}>
        Select Replacement Product
      </Heading>
      <Input
        placeholder="Search by product name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={4}
      />
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {filteredProducts.map((product) => (
          <Box
            key={product.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
          >
            <VStack spacing={2} align="start">
              <Text fontWeight="bold">{product.name}</Text>
              <Text>Brand: {product.brand?.name}</Text>
              <Text>Price: Rs. {product.price.toFixed(2)}</Text>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => onSelectReplacement(product)}
              >
                Select
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ReturnProductSelector;
