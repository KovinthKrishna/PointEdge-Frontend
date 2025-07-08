import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  SimpleGrid,
  Button,
  Badge,
  Image,
  InputGroup,
  InputLeftElement,
  Select,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Search, Package, ArrowRight } from "lucide-react";
import Product from "../../models/Product";

interface ExchangeProductSelectorProps {
  onSelectReplacement: (product: Product) => void;
  refundAmount: number;
  onBack: () => void;
}

const ExchangeProductSelector: React.FC<ExchangeProductSelectorProps> = ({
  onSelectReplacement,
  refundAmount,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  const toast = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products`);
        const data = await response.json();

        setProducts(data.content || data);
        setFilteredProducts(data.content || data);

        // Extract unique categories
        const productsArray = data.content || data;
        const categoryNames = productsArray
          .map((product: Product) => product.category?.name)
          .filter((name: string | undefined): name is string => Boolean(name));
        const uniqueCategories: string[] = Array.from(
          new Set<string>(categoryNames)
        );
        setCategories(uniqueCategories);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const getPriceDifference = (productPrice: number) => {
    return productPrice - refundAmount;
  };

  const getPriceBadge = (productPrice: number) => {
    const difference = getPriceDifference(productPrice);

    if (difference > 0) {
      return (
        <Badge colorScheme="orange" variant="solid">
          +Rs {difference.toFixed(2)}
        </Badge>
      );
    } else if (difference < 0) {
      return (
        <Badge colorScheme="green" variant="solid">
          -Rs {Math.abs(difference).toFixed(2)}
        </Badge>
      );
    } else {
      return (
        <Badge colorScheme="blue" variant="solid">
          Even Exchange
        </Badge>
      );
    }
  };

  const handleProductSelect = (product: Product) => {
    const difference = getPriceDifference(product.price);

    if (difference > 0) {
      toast({
        title: "Additional Payment Required",
        description: `You'll need to pay an additional Rs ${difference.toFixed(
          2
        )} for this exchange.`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } else if (difference < 0) {
      toast({
        title: "Refund Due",
        description: `You'll receive Rs ${Math.abs(difference).toFixed(
          2
        )} back from this exchange.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }

    onSelectReplacement(product);
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Package size={48} />
        <Text mt={4}>Loading products...</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      {/* Exchange Info Alert */}
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">Exchange Product Selection</Text>
          <Text fontSize="sm">
            Your refund amount: Rs {refundAmount.toFixed(2)}. Select a
            replacement product below.
          </Text>
        </VStack>
      </Alert>

      {/* Search and Filter Controls */}
      <HStack spacing={4} align="end">
        <Box flex={1}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search size={16} color="gray" />
            </InputLeftElement>
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Box>

        <Box minW="200px">
          <Select
            placeholder="All Categories"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Box>
      </HStack>

      {/* Results Count */}
      <Text fontSize="sm" color="gray.600">
        {filteredProducts.length} product
        {filteredProducts.length !== 1 ? "s" : ""} found
      </Text>

      {/* Products Grid */}
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {filteredProducts.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            bg="white"
            shadow="sm"
            _hover={{ shadow: "md", transform: "translateY(-2px)" }}
            transition="all 0.2s"
            cursor="pointer"
            onClick={() => handleProductSelect(product)}
          >
            <VStack spacing={3} align="stretch">
              {/* Product Image */}
              <Box
                bg="gray.50"
                borderRadius="md"
                p={2}
                minH="120px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  maxH="100px"
                  maxW="100px"
                  objectFit="contain"
                  fallback={<Package size={40} color="gray" />}
                />
              </Box>

              {/* Product Info */}
              <VStack spacing={2} align="start">
                <Text fontWeight="bold" fontSize="sm" noOfLines={2}>
                  {product.name}
                </Text>

                {product.brand && (
                  <Text fontSize="xs" color="gray.600">
                    {product.brand.name}
                  </Text>
                )}

                <HStack justify="space-between" w="100%">
                  <Text fontWeight="bold" color="blue.600">
                    Rs {product.price.toFixed(2)}
                  </Text>
                  {getPriceBadge(product.price)}
                </HStack>
              </VStack>

              {/* Select Button */}
              <Button
                size="sm"
                colorScheme="blue"
                rightIcon={<ArrowRight size={14} />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductSelect(product);
                }}
              >
                Select for Exchange
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <Box textAlign="center" py={10}>
          <Package size={48} color="gray" />
          <Text mt={4} color="gray.600">
            No products found matching your criteria
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default ExchangeProductSelector;
