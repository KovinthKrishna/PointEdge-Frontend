import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Heading, Text } from "@chakra-ui/react";
import { TopSellingProduct } from "../../models/Analysis";

interface Props {
  data?: TopSellingProduct[];
}

const TopSellingProductsChart = ({ data }: Props) => {
  const isValidData = Array.isArray(data) && data.length > 0;

  return (
    <Box p={4} bg="white" shadow="md" borderRadius="lg">
      <Heading size="md" mb={4} color="black">
        Top Selling Products
      </Heading>
      {isValidData ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="productName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantitySold" fill="#008ED8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Text color="gray">No top-selling product data available.</Text>
      )}
    </Box>
  );
};

export default TopSellingProductsChart;
