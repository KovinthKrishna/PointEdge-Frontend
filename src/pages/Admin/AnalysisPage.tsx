import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CategoryDistributionChart from "../../components/Charts/CategoryDistributionChart";
import ReturnRateChart from "../../components/Charts/RerturnRateChart";
import RevenueByProductChart from "../../components/Charts/RevenueByProductsChart";
import SalesOverTimeChart from "../../components/Charts/SalesOverTimeChart";
import TopSellingProductsChart from "../../components/Charts/TopSellingProducts";
import {
  CategoryDistribution,
  fetchCategoryDistribution,
  fetchReturnRates,
  fetchRevenueByProduct,
  fetchSalesOverTime,
  fetchTopSellingProducts,
  ReturnRate,
  RevenueByProduct,
  SalesOverTime,
  TopSellingProduct,
} from "../../models/Analysis";

const AnalysisPage = () => {
  const [topSellingProducts, setTopSellingProducts] = useState<
    TopSellingProduct[]
  >([]);
  const [salesOverTime, setSalesOverTime] = useState<SalesOverTime[]>([]);
  const [revenueByProduct, setRevenueByProduct] = useState<RevenueByProduct[]>(
    []
  );
  const [returnRates, setReturnRates] = useState<ReturnRate[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<
    CategoryDistribution[]
  >([]);

  useEffect(() => {
    fetchTopSellingProducts().then(setTopSellingProducts);
    fetchSalesOverTime().then(setSalesOverTime);
    fetchRevenueByProduct().then(setRevenueByProduct);
    fetchReturnRates().then(setReturnRates);
    fetchCategoryDistribution().then(setCategoryDistribution);
  }, []);

  return (
    <Box p={6}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <TopSellingProductsChart data={topSellingProducts} />
        <SalesOverTimeChart data={salesOverTime} />
        <RevenueByProductChart data={revenueByProduct} />
        <ReturnRateChart data={returnRates} />
        <CategoryDistributionChart data={categoryDistribution} />
      </SimpleGrid>
    </Box>
  );
};

export default AnalysisPage;
