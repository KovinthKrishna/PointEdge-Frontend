import { SimpleGrid } from "@chakra-ui/react";
import RealTimeTimer from "./RealTimeTimer";
import SalesStats from "./SalesStats";

const DashboardTop = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      gridTemplateColumns={{ lg: "auto auto" }}
      padding={2}
      alignItems="center"
    >
      <RealTimeTimer />
      <SalesStats />
    </SimpleGrid>
  );
};

export default DashboardTop;
