import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Heading, Text } from "@chakra-ui/react";
import { RevenueByProduct } from "../../models/Analysis";

interface Props {
  data?: RevenueByProduct[];
}

const RevenueByProductChart = ({ data }: Props) => {
  const isValidData = Array.isArray(data) && data.length > 0;

  return (
    <Box p={4} bg="white" shadow="md" borderRadius="lg">
      <Heading size="md" mb={4}>
        Revenue by Product
      </Heading>

      {isValidData ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="productName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#D69E2E" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Text>No revenue data available.</Text>
      )}
    </Box>
  );
};

export default RevenueByProductChart;
