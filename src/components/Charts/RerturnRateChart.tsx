import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Heading, Text } from "@chakra-ui/react";
import { ReturnRate } from "../../models/Analysis";

interface Props {
  data?: ReturnRate[];
}

const ReturnRateChart = ({ data }: Props) => {
  const isValidData = Array.isArray(data) && data.length > 0;

  return (
    <Box p={4} bg="white" shadow="md" borderRadius="lg">
      <Heading size="md" mb={4} color="black">
        Return Rate by Product
      </Heading>
      {isValidData ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="productName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="returnRate" fill="#008ED8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Text color="gray">No return rate data available.</Text>
      )}
    </Box>
  );
};

export default ReturnRateChart;
