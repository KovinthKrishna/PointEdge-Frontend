import { SimpleGrid } from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoPricetag } from "react-icons/io5";
import useProductOrderQuantities from "../../../hooks/useProductOrderQuantities";
import priceFormatter from "../../../utils/priceFormatter";
import SalesStatCard from "./SalesStatCard";

const SalesStats = () => {
  const { data } = useProductOrderQuantities();
  const totalOrders = data
    ? data.reduce((sum, item) => sum + item.totalQuantity, 0)
    : 0;
  const totalRevenue = data
    ? data.reduce(
        (sum, item) => sum + item.totalQuantity * item.pricePerUnit,
        0
      )
    : 0;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <SimpleGrid
      spacing={2.5}
      columns={{ base: 1, md: 2, lg: 3 }}
      paddingX={{ base: 8, lg: 2 }}
      paddingY={2}
    >
      <SalesStatCard
        icon={FaShoppingBag}
        statValue={`${totalOrders}`}
        statLabel="Total Orders"
      />
      <SalesStatCard
        icon={GiTakeMyMoney}
        statValue={priceFormatter(totalRevenue)}
        statLabel="Total Revenue"
      />
      <SalesStatCard
        icon={IoPricetag}
        statValue={priceFormatter(averageOrderValue)}
        statLabel="Average Order Value"
      />
    </SimpleGrid>
  );
};

export default SalesStats;
