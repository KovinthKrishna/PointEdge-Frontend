import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Heading, Text } from "@chakra-ui/react";
import { SalesOverTime } from "../../models/Analysis";

interface Props {
  data?: SalesOverTime[];
}

const SalesOverTimeChart = ({ data }: Props) => {
  const isValidData = Array.isArray(data) && data.length > 0;

  return (
    <Box p={4} bg="white" shadow="md" borderRadius="lg">
      <Heading size="md" mb={4}>
        Sales Over Time
      </Heading>

      {isValidData ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#38A169"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Text>No sales data available.</Text>
      )}
    </Box>
  );
};

export default SalesOverTimeChart;
