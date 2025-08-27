import { SimpleGrid } from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoPricetag } from "react-icons/io5";
import useOrderStats from "../../../hooks/useOrderStats";
import priceFormatter from "../../../utils/priceFormatter";
import SalesStatCard from "./SalesStatCard";

const SalesStats = () => {
  const { data } = useOrderStats();

  return (
    <SimpleGrid
      spacing={2.5}
      columns={{ base: 1, md: 2, lg: 3 }}
      paddingX={{ base: 8, lg: 2 }}
      paddingY={2}
    >
      <SalesStatCard
        icon={FaShoppingBag}
        statValue={`${data?.totalOrders ?? 0}`}
        statLabel="Total Orders"
      />
      <SalesStatCard
        icon={GiTakeMyMoney}
        statValue={priceFormatter(data?.totalRevenue ?? 0)}
        statLabel="Total Revenue"
      />
      <SalesStatCard
        icon={IoPricetag}
        statValue={priceFormatter(
          data ? data.totalRevenue / (data.totalOrders || 1) : 0
        )}
        statLabel="Average Order Value"
      />
    </SimpleGrid>
  );
};

export default SalesStats;
