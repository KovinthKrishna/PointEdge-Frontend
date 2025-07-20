import { Box, Heading, Text } from "@chakra-ui/react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CategoryDistribution } from "../../models/Analysis";

const COLORS = ["#3182CE", "#38A169", "#D69E2E", "#E53E3E", "#805AD5"];

interface Props {
  data: CategoryDistribution[] | undefined;
}

const CategoryDistributionChart = ({ data }: Props) => {
  const isValidData = Array.isArray(data) && data.length > 0;

  return (
    <Box p={4} bg="white" shadow="md" borderRadius="lg">
      <Heading size="md" mb={4}>
        Product Category Distribution
      </Heading>

      {isValidData ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Text>No category distribution data available.</Text>
      )}
    </Box>
  );
};

export default CategoryDistributionChart;
