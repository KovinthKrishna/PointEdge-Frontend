import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { 
  Box, 
  Flex, 
  Text, 
  Grid, 
  GridItem, 
  Select,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input
} from "@chakra-ui/react";
import { 
  fetchOrderCounts, 
  fetchDiscountCountsByType, 
  DiscountCountsByType,
  fetchCustomerTierCounts,
  CustomerTierCounts,
  fetchLoyaltyDiscountByTier,
  LoyaltyDiscountData,
  fetchItemDiscountAnalytics,
  ItemDiscountAnalytics,
  fetchCategoryDiscountAnalytics,
  CategoryDiscountAnalytics,
  fetchDiscountTotals,
  DiscountTotals,
  fetchOrderTotals,
  OrderTotals
} from "../../services/orderDetailsService";

interface OrderCounts {
  last24Hours: number;
  last7Days: number;
  last30Days: number;
  lastYear: number;
  custom?: number;
}

interface LineChartData {
  loyalty: number[];
  item: number[];
  category: number[];
}

const LineChart = ({ data, colors }: { data: LineChartData; colors: string[] }) => {
  const maxLoyalty = Math.max(...data.loyalty);
  const maxItem = Math.max(...data.item);
  const maxCategory = Math.max(...data.category);
  const maxValue = Math.max(maxLoyalty, maxItem, maxCategory);
  
  const chartHeight = 100;
  const chartWidth = 200;
  
  const createLinePoints = (values: number[]) => {
    return values.map((value, index) => {
      const x = (index / (values.length - 1)) * chartWidth;
      const y = chartHeight - (value / maxValue) * chartHeight;
      return `${x},${y}`;
    }).join(' ');
  };

  const loyaltyPoints = createLinePoints(data.loyalty);
  const itemPoints = createLinePoints(data.item);
  const categoryPoints = createLinePoints(data.category);

  return (
    <Box mt={4} mb={2}>
      <Box as="svg" width="100%" height="120px" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        {[0, 1, 2, 3, 4].map((line) => (
          <Box 
            key={line} 
            as="line" 
            x1="0" 
            y1={line * (chartHeight / 4)} 
            x2={chartWidth} 
            y2={line * (chartHeight / 4)} 
            stroke="#e2e8f0" 
            strokeWidth="1"
          />
        ))}
        
        <Box
          as="polyline"
          points={loyaltyPoints}
          fill="none"
          stroke={colors[0]}
          strokeWidth="2"
        />
        
        <Box
          as="polyline"
          points={itemPoints}
          fill="none"
          stroke={colors[1]}
          strokeWidth="2"
        />
        
        <Box
          as="polyline"
          points={categoryPoints}
          fill="none"
          stroke={colors[2]}
          strokeWidth="2"
        />
        
        {data.loyalty.map((value, index) => {
          const x = (index / (data.loyalty.length - 1)) * chartWidth;
          const y = chartHeight - (value / maxValue) * chartHeight;
          return (
            <Box
              key={`loyalty-${index}`}
              as="circle"
              cx={x}
              cy={y}
              r="2"
              fill="#fff"
              stroke={colors[0]}
              strokeWidth="1"
            />
          );
        })}
        
        {data.item.map((value, index) => {
          const x = (index / (data.item.length - 1)) * chartWidth;
          const y = chartHeight - (value / maxValue) * chartHeight;
          return (
            <Box
              key={`item-${index}`}
              as="circle"
              cx={x}
              cy={y}
              r="2"
              fill="#fff"
              stroke={colors[1]}
              strokeWidth="1"
            />
          );
        })}
        
        {data.category.map((value, index) => {
          const x = (index / (data.category.length - 1)) * chartWidth;
          const y = chartHeight - (value / maxValue) * chartHeight;
          return (
            <Box
              key={`category-${index}`}
              as="circle"
              cx={x}
              cy={y}
              r="2"
              fill="#fff"
              stroke={colors[2]}
              strokeWidth="1"
            />
          );
        })}
      </Box>
    </Box>
  );
};

interface BarChartData {
  values: number[];
}

const BarChart = ({ data, colors }: { data: BarChartData[]; colors: string[] }) => {
  const maxValue = Math.max(...data.map(point => Math.max(...point.values)));
  const chartHeight = 100;
  
  return (
    <Box mt={4} mb={2}>
      <Box as="svg" width="100%" height="120px" viewBox={`0 0 ${data.length * 15} ${chartHeight}`}>
        {[0, 1, 2, 3, 4].map((line) => (
          <Box 
            key={line} 
            as="line" 
            x1="0" 
            y1={line * (chartHeight / 4)} 
            x2={data.length * 15} 
            y2={line * (chartHeight / 4)} 
            stroke="#e2e8f0" 
            strokeWidth="1"
          />
        ))}
        
        {data.map((dataPoint, dayIndex) => (
          <React.Fragment key={dayIndex}>
            {dataPoint.values.map((value, valueIndex) => {
              const barWidth = 3;
              const x = dayIndex * 15 + valueIndex * (barWidth + 1);
              const height = (value / maxValue) * chartHeight;
              const y = chartHeight - height;
              
              return (
                <Box
                  key={`${dayIndex}-${valueIndex}`}
                  as="rect"
                  x={x}
                  y={y}
                  width={barWidth}
                  height={height}
                  fill={colors[valueIndex]}
                />
              );
            })}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

interface DonutChartSegment {
  value: number;
  color: string;
  label: string;
  percentage?: string;
  count?: number;
}

interface DonutChartProps {
  segments: DonutChartSegment[];
  centerText: string;
  centerTextColor?: string;
}

const DonutChart = ({ segments, centerText, centerTextColor = "#00669B" }: DonutChartProps) => {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;
  
  const chartSegments = segments.map((segment) => {
    const percentage = total > 0 ? segment.value / total : 0;
    const dashArray = percentage * circumference;
    const dashOffset = -currentOffset;
    currentOffset += dashArray;
    
    return {
      ...segment,
      dashArray,
      dashOffset
    };
  });

  return (
    <Box mt={4} mb={2} position="relative">
      <Box as="svg" width="100%" height="150px" viewBox="0 0 100 100">
        {chartSegments.map((segment, index) => (
          <Box
            key={index}
            as="circle"
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth="15"
            strokeDasharray={`${segment.dashArray} ${circumference}`}
            strokeDashoffset={segment.dashOffset}
            transform="rotate(-90 50 50)"
          />
        ))}
        <Box as="circle" cx="50" cy="50" r="30" fill="white" />
        <Box
          as="text"
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={centerTextColor}
          fontSize="16"
          fontWeight="bold"
        >
          {centerText}
        </Box>
      </Box>
    </Box>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  subvalue: string;
  chart: React.ReactNode;
  legend?: { color: string; label: string; percentage?: string; count?: number }[];
  period: string;
  onPeriodChange: (period: string, startDate?: string, endDate?: string) => void;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subvalue, 
  chart, 
  legend, 
  period,
  onPeriodChange
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleCustomDateSubmit = () => {
    if (startDate && endDate) {
      const formattedStart = new Date(startDate).toISOString();
      const formattedEnd = new Date(endDate).toISOString();
      onPeriodChange('custom', formattedStart, formattedEnd);
      setShowDatePicker(false);
    }
  };

  return (
    <Card boxShadow="sm" borderRadius="md" height="100%">
      <CardHeader pb={0}>
        <Flex justify="space-between" align="center">
          <Text fontSize="md" color="gray.600">{title}</Text>
          <Box position="relative">
            <Select 
              size="xs" 
              width="120px" 
              value={period}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setShowDatePicker(true);
                } else {
                  onPeriodChange(e.target.value);
                }
              }}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last Month</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range</option>
            </Select>
            
            

            {showDatePicker && (
              <Box 
                position="absolute" 
                top="100%" 
                right="0" 
                mt={2} 
                p={4} 
                bg="white" 
                boxShadow="lg" 
                borderRadius="md" 
                zIndex={1000}
                width="300px"
                border="1px solid"
                borderColor="gray.200"
              >
                <Box mb={3}>
                  <Text fontSize="sm" mb={1}>Start Date</Text>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </Box>
                <Box mb={3}>
                  <Text fontSize="sm" mb={1}>End Date</Text>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </Box>
                <Flex justify="flex-end" gap={2}>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowDatePicker(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleCustomDateSubmit}
                    isDisabled={!startDate || !endDate}
                  >
                    Apply
                  </Button>
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      </CardHeader>
      <CardBody pt={2}>
        <Text fontSize="2xl" fontWeight="bold" color="#00669B">{value}</Text>
        <Text fontSize="sm" color="green.500">{subvalue}</Text>
        
        {chart}
        
        {legend && (
          <Flex mt={2} flexWrap="wrap" gap={2}>
            {legend.map((item, index) => (
              <Flex key={index} align="center" mr={3} fontSize="xs">
                <Box w="8px" h="8px" borderRadius="full" bg={item.color} mr={1} />
                <Text>{item.label}{item.count !== undefined ? ` (${item.count})` : ''}{item.percentage && ` ${item.percentage}`}</Text>
              </Flex>
            ))}
          </Flex>
        )}
      </CardBody>
    </Card>
  );
};

interface DiscountReportProps {
  onBack: () => void;
}

const DiscountReport: React.FC<DiscountReportProps> = ({ onBack }) => {
  const colors = {
    primary: "#00669B",
    secondary: "#003049",
    tertiary: "#008ED8",
    quaternary: "#6C757D"
  };
  
  const [orderCounts, setOrderCounts] = useState<OrderCounts>({
    last24Hours: 0,
    last7Days: 0,
    last30Days: 0,
    lastYear: 0
  });

  const [discountCounts, setDiscountCounts] = useState<DiscountCountsByType>({
    ITEM: {
      last24Hours: 0,
      last7Days: 0,
      last30Days: 0,
      lastYear: 0
    },
    CATEGORY: {
      last24Hours: 0,
      last7Days: 0,
      last30Days: 0,
      lastYear: 0
    },
    LOYALTY: {
      last24Hours: 0,
      last7Days: 0,
      last30Days: 0,
      lastYear: 0
    }
  });

  const [customerTierCounts, setCustomerTierCounts] = useState<CustomerTierCounts>({
    totalcustomers: 0,
    GOLD: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 },
    SILVER: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 },
    BRONZE: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 },
    NOTLOYALTY: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 }
  });

  const [loyaltyDiscountData, setLoyaltyDiscountData] = useState<LoyaltyDiscountData>({
    GOLD: { last24Hours: 0, last7Days: 0, last30Days: 0, lastYear: 0 },
    SILVER: { last24Hours: 0, last7Days: 0, last30Days: 0, lastYear: 0 },
    BRONZE: { last24Hours: 0, last7Days: 0, last30Days: 0, lastYear: 0 },
    NOTLOYALTY: { last24Hours: 0, last7Days: 0, last30Days: 0, lastYear: 0 },
    totaldiscount: {
      goldtotaldiscount: 0,
      silvertotaldiscount: 0,
      bronzetotaldiscount: 0
    }
  });

  const [itemDiscountAnalytics, setItemDiscountAnalytics] = useState<ItemDiscountAnalytics>({
    last24Hours: { totalAmount: 0, totalDiscount: 0, topItems: [] },
    last7Days: { totalAmount: 0, totalDiscount: 0, topItems: [] },
    last30Days: { totalAmount: 0, totalDiscount: 0, topItems: [] },
    lastYear: { totalAmount: 0, totalDiscount: 0, topItems: [] }
  });

  const [categoryDiscountAnalytics, setCategoryDiscountAnalytics] = useState<CategoryDiscountAnalytics>({
    last24Hours: { totalAmount: 0, totalDiscount: 0, topCategories: [] },
    last7Days: { totalAmount: 0, totalDiscount: 0, topCategories: [] },
    last30Days: { totalAmount: 0, totalDiscount: 0, topCategories: [] },
    lastYear: { totalAmount: 0, totalDiscount: 0, topCategories: [] }
  });

  const [discountTotals, setDiscountTotals] = useState<DiscountTotals>({
    last24Hours: {
      categoryDiscount: 0,
      loyaltyDiscount: 0,
      itemDiscount: 0,
      totalDiscount: 0
    },
    last7Days: {
      categoryDiscount: 0,
      loyaltyDiscount: 0,
      itemDiscount: 0,
      totalDiscount: 0
    },
    last30Days: {
      categoryDiscount: 0,
      loyaltyDiscount: 0,
      itemDiscount: 0,
      totalDiscount: 0
    },
    lastYear: {
      categoryDiscount: 0,
      loyaltyDiscount: 0,
      itemDiscount: 0,
      totalDiscount: 0
    }
  });

  const [orderTotals, setOrderTotals] = useState<OrderTotals>({
    last24Hours: {
      totalAmount: 0,
      totalCategoryAmount: 0,
      totalLoyaltyAmount: 0,
      totalPointsEarned: 0,
      totalItemAmount: 0
    },
    last7Days: {
      totalAmount: 0,
      totalCategoryAmount: 0,
      totalLoyaltyAmount: 0,
      totalPointsEarned: 0,
      totalItemAmount: 0
    },
    last30Days: {
      totalAmount: 0,
      totalCategoryAmount: 0,
      totalLoyaltyAmount: 0,
      totalPointsEarned: 0,
      totalItemAmount: 0
    },
    lastYear: {
      totalAmount: 0,
      totalCategoryAmount: 0,
      totalLoyaltyAmount: 0,
      totalPointsEarned: 0,
      totalItemAmount: 0
    }
  });

  const [popularDiscountPeriod, setPopularDiscountPeriod] = useState("7d");
  const [customersPeriod, setCustomersPeriod] = useState("30d");
  const [totalDiscountPeriod, setTotalDiscountPeriod] = useState("7d");
  const [loyaltyDiscountPeriod, setLoyaltyDiscountPeriod] = useState("7d");
  const [popularItemPeriod, setPopularItemPeriod] = useState("7d");
  const [popularCategoryPeriod, setPopularCategoryPeriod] = useState("7d");
  
  const loadData = async () => {
    try {
      const [
        counts, 
        discountsByType, 
        tierCounts, 
        loyaltyData, 
        itemAnalytics, 
        categoryAnalytics,
        discountTotalsData,
        orderTotalsData
      ] = await Promise.all([
        fetchOrderCounts(),
        fetchDiscountCountsByType(),
        fetchCustomerTierCounts(),
        fetchLoyaltyDiscountByTier(),
        fetchItemDiscountAnalytics(),
        fetchCategoryDiscountAnalytics(),
        fetchDiscountTotals(),
        fetchOrderTotals()
      ]);
      setOrderCounts(counts);
      setDiscountCounts(discountsByType);
      setCustomerTierCounts(tierCounts);
      setLoyaltyDiscountData(loyaltyData);
      setItemDiscountAnalytics(itemAnalytics);
      setCategoryDiscountAnalytics(categoryAnalytics);
      setDiscountTotals(discountTotalsData);
      setOrderTotals(orderTotalsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const loadCustomData = async (periodType: string, startDate: string, endDate: string) => {
    try {
      switch(periodType) {
        case 'totalDiscount':
          const [counts, discountsByType, discountTotalsData, orderTotalsData] = await Promise.all([
            fetchOrderCounts('custom', startDate, endDate),
            fetchDiscountCountsByType('custom', startDate, endDate),
            fetchDiscountTotals('custom', startDate, endDate),
            fetchOrderTotals('custom', startDate, endDate)
          ]);
          setOrderCounts(prev => ({ ...prev, custom: counts.custom }));
          setDiscountCounts(prev => ({
            ...prev,
            ITEM: { ...prev.ITEM, custom: discountsByType.ITEM.custom },
            CATEGORY: { ...prev.CATEGORY, custom: discountsByType.CATEGORY.custom },
            LOYALTY: { ...prev.LOYALTY, custom: discountsByType.LOYALTY.custom }
          }));
          setDiscountTotals(prev => ({ ...prev, custom: discountTotalsData.custom }));
          setOrderTotals(prev => ({ ...prev, custom: orderTotalsData.custom }));
          break;
        
        case 'customers':
          const [tierCounts, loyaltyData] = await Promise.all([
            fetchCustomerTierCounts('custom', startDate, endDate),
            fetchLoyaltyDiscountByTier('custom', startDate, endDate)
          ]);
          setCustomerTierCounts(prev => ({
            ...prev,
            GOLD: { ...prev.GOLD, custom: tierCounts.GOLD.custom },
            SILVER: { ...prev.SILVER, custom: tierCounts.SILVER.custom },
            BRONZE: { ...prev.BRONZE, custom: tierCounts.BRONZE.custom },
            NOTLOYALTY: { ...prev.NOTLOYALTY, custom: tierCounts.NOTLOYALTY.custom }
          }));
          setLoyaltyDiscountData(prev => ({
            ...prev,
            GOLD: { ...prev.GOLD, custom: loyaltyData.GOLD.custom },
            SILVER: { ...prev.SILVER, custom: loyaltyData.SILVER.custom },
            BRONZE: { ...prev.BRONZE, custom: loyaltyData.BRONZE.custom },
            NOTLOYALTY: { ...prev.NOTLOYALTY, custom: loyaltyData.NOTLOYALTY.custom },
            totaldiscount: { ...prev.totaldiscount, custom: loyaltyData.totaldiscount.custom }
          }));
          break;
        
        // Add cases for other period types as needed
      }
    } catch (error) {
      console.error(`Failed to load custom data for ${periodType}:`, error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePeriodChange = (periodType: string, period: string, startDate?: string, endDate?: string) => {
    switch(periodType) {
      case 'popularDiscount':
        setPopularDiscountPeriod(period);
        if (period === 'custom' && startDate && endDate) {
          loadCustomData('popularDiscount', startDate, endDate);
        }
        break;
      case 'totalDiscount':
        setTotalDiscountPeriod(period);
        if (period === 'custom' && startDate && endDate) {
          loadCustomData('totalDiscount', startDate, endDate);
        }
        break;
      case 'customers':
        setCustomersPeriod(period);
        if (period === 'custom' && startDate && endDate) {
          loadCustomData('customers', startDate, endDate);
        }
        break;
      case 'loyaltyDiscount':
        setLoyaltyDiscountPeriod(period);
        if (period === 'custom' && startDate && endDate) {
          loadCustomData('loyaltyDiscount', startDate, endDate);
        }
        break;
      case 'popularItem':
        setPopularItemPeriod(period);
        if (period === 'custom' && startDate && endDate) {
          loadCustomData('popularItem', startDate, endDate);
        }
        break;
      case 'popularCategory':
        setPopularCategoryPeriod(period);
        if (period === 'custom' && startDate && endDate) {
          loadCustomData('popularCategory', startDate, endDate);
        }
        break;
      default:
        break;
    }
  };

  const getOrderCountForPeriod = (period: string): number => {
    if (period === 'custom' && orderCounts.custom !== undefined) {
      return orderCounts.custom;
    }
    
    switch(period) {
      case "24h": return orderCounts.last24Hours;
      case "7d": return orderCounts.last7Days;
      case "30d": return orderCounts.last30Days;
      case "year": return orderCounts.lastYear;
      default: return orderCounts.last7Days;
    }
  };

  const getDiscountCountForPeriod = (type: string, period: string): number => {
    if (!discountCounts[type as keyof DiscountCountsByType]) return 0;
    
    if (period === 'custom' && discountCounts[type as keyof DiscountCountsByType].custom !== undefined) {
      return discountCounts[type as keyof DiscountCountsByType].custom || 0;
    }
    
    switch(period) {
      case "24h": return discountCounts[type as keyof DiscountCountsByType].last24Hours;
      case "7d": return discountCounts[type as keyof DiscountCountsByType].last7Days;
      case "30d": return discountCounts[type as keyof DiscountCountsByType].last30Days;
      case "year": return discountCounts[type as keyof DiscountCountsByType].lastYear;
      default: return discountCounts[type as keyof DiscountCountsByType].last7Days;
    }
  };

  const getDiscountTotalsForPeriod = (period: string) => {
    if (period === 'custom' && discountTotals.custom !== undefined) {
      return discountTotals.custom;
    }
    
    switch(period) {
      case "24h": return discountTotals.last24Hours;
      case "7d": return discountTotals.last7Days;
      case "30d": return discountTotals.last30Days;
      case "year": return discountTotals.lastYear;
      default: return discountTotals.last7Days;
    }
  };

  const getOrderTotalsForPeriod = (period: string) => {
    if (period === 'custom' && orderTotals.custom !== undefined) {
      return orderTotals.custom;
    }
    
    switch(period) {
      case "24h": return orderTotals.last24Hours;
      case "7d": return orderTotals.last7Days;
      case "30d": return orderTotals.last30Days;
      case "year": return orderTotals.lastYear;
      default: return orderTotals.last7Days;
    }
  };

  const getLoyaltyCountForPeriod = (tier: string, period: string): number => {
    if (!loyaltyDiscountData[tier as keyof LoyaltyDiscountData]) return 0;
    
    if (period === 'custom' && loyaltyDiscountData[tier as keyof LoyaltyDiscountData].custom !== undefined) {
      return loyaltyDiscountData[tier as keyof LoyaltyDiscountData].custom || 0;
    }
    
    switch(period) {
      case "24h": 
        if (tier !== "totaldiscount") {
          return loyaltyDiscountData[tier as keyof Omit<LoyaltyDiscountData, 'totaldiscount'>].last24Hours;
        }
        return 0;
      case "7d": {
        const tierData = loyaltyDiscountData[tier as keyof LoyaltyDiscountData];
        if ('last7Days' in tierData) {
          return tierData.last7Days;
        }
        return 0;
      }
      case "30d": 
        if (tier !== "totaldiscount") {
          return loyaltyDiscountData[tier as keyof Omit<LoyaltyDiscountData, 'totaldiscount'>].last30Days;
        }
        return 0;
      case "year": 
        if (tier !== "totaldiscount") {
          return loyaltyDiscountData[tier as keyof Omit<LoyaltyDiscountData, 'totaldiscount'>].lastYear;
        }
        return 0;
      default: 
        if (tier !== "totaldiscount") {
          return loyaltyDiscountData[tier as keyof Omit<LoyaltyDiscountData, 'totaldiscount'>].last7Days;
        }
        return 0;
    }
  };

  const getTotalDiscountsForPeriod = (period: string): number => {
    return getDiscountCountForPeriod("ITEM", period) + 
           getDiscountCountForPeriod("CATEGORY", period) + 
           getDiscountCountForPeriod("LOYALTY", period);
  };

  const getCustomerCountsForPeriod = (period: string) => {
    let gold, silver, bronze, notLoyalty;
    
    if (period === 'custom') {
      gold = customerTierCounts.GOLD.custom || 0;
      silver = customerTierCounts.SILVER.custom || 0;
      bronze = customerTierCounts.BRONZE.custom || 0;
      notLoyalty = customerTierCounts.NOTLOYALTY.custom || 0;
    } else {
      switch(period) {
        case "24h":
          gold = customerTierCounts.GOLD.last24Hours;
          silver = customerTierCounts.SILVER.last24Hours;
          bronze = customerTierCounts.BRONZE.last24Hours;
          notLoyalty = customerTierCounts.NOTLOYALTY.last24Hours;
          break;
        case "7d":
          gold = customerTierCounts.GOLD.last7Days;
          silver = customerTierCounts.SILVER.last7Days;
          bronze = customerTierCounts.BRONZE.last7Days;
          notLoyalty = customerTierCounts.NOTLOYALTY.last7Days;
          break;
        case "30d":
          gold = customerTierCounts.GOLD.last30Days;
          silver = customerTierCounts.SILVER.last30Days;
          bronze = customerTierCounts.BRONZE.last30Days;
          notLoyalty = customerTierCounts.NOTLOYALTY.last30Days;
          break;
        case "year":
          gold = customerTierCounts.GOLD.lastYear;
          silver = customerTierCounts.SILVER.lastYear;
          bronze = customerTierCounts.BRONZE.lastYear;
          notLoyalty = customerTierCounts.NOTLOYALTY.lastYear;
          break;
        default:
          gold = customerTierCounts.GOLD.last30Days;
          silver = customerTierCounts.SILVER.last30Days;
          bronze = customerTierCounts.BRONZE.last30Days;
          notLoyalty = customerTierCounts.NOTLOYALTY.last30Days;
      }
    }
    
    return { gold, silver, bronze, notLoyalty };
  };

  const getPercentageColor = (percentage: number): string => {
    if (percentage > 30) return "#38A169";
    if (percentage > 10) return "#DD6B20";
    return "#E53E3E";
  };

  const getCustomerSegments = (period: string) => {
    const { gold, silver, bronze, notLoyalty } = getCustomerCountsForPeriod(period);
    const totalActive = gold + silver + bronze + notLoyalty;
    const totalCustomers = customerTierCounts.totalcustomers || 1;
    
    return {
      segments: [
        { 
          value: gold, 
          color: colors.primary, 
          label: 'Gold',
          count: gold,
          percentage: totalActive > 0 ? `${Math.round((gold / totalActive) * 100)}%` : '0%'
        },
        { 
          value: silver, 
          color: colors.secondary, 
          label: 'Silver',
          count: silver,
          percentage: totalActive > 0 ? `${Math.round((silver / totalActive) * 100)}%` : '0%'
        },
        { 
          value: bronze, 
          color: colors.tertiary, 
          label: 'Bronze',
          count: bronze,
          percentage: totalActive > 0 ? `${Math.round((bronze / totalActive) * 100)}%` : '0%'
        },
        { 
          value: notLoyalty, 
          color: colors.quaternary, 
          label: 'Regular',
          count: notLoyalty,
          percentage: totalActive > 0 ? `${Math.round((notLoyalty / totalActive) * 100)}%` : '0%'
        }
      ],
      activeCustomers: totalActive,
      percentage: Math.round((totalActive / totalCustomers) * 100)
    };
  };

  const createLineChartData = (period: string): LineChartData => {
    const totals = getOrderTotalsForPeriod(period);
    
    return {
      loyalty: [
        totals.totalLoyaltyAmount * 0.3,
        totals.totalLoyaltyAmount * 0.5,
        totals.totalLoyaltyAmount * 0.7,
        totals.totalLoyaltyAmount * 0.9,
        totals.totalLoyaltyAmount,
        totals.totalLoyaltyAmount * 0.8,
        totals.totalLoyaltyAmount * 0.6,
        totals.totalLoyaltyAmount * 0.7
      ],
      item: [
        totals.totalItemAmount * 0.4,
        totals.totalItemAmount * 0.6,
        totals.totalItemAmount * 0.8,
        totals.totalItemAmount,
        totals.totalItemAmount * 0.9,
        totals.totalItemAmount * 0.7,
        totals.totalItemAmount * 0.5,
        totals.totalItemAmount * 0.6
      ],
      category: [
        totals.totalCategoryAmount * 0.5,
        totals.totalCategoryAmount * 0.7,
        totals.totalCategoryAmount * 0.9,
        totals.totalCategoryAmount,
        totals.totalCategoryAmount * 0.8,
        totals.totalCategoryAmount * 0.6,
        totals.totalCategoryAmount * 0.4,
        totals.totalCategoryAmount * 0.5
      ]
    };
  };

  const createBarChartData = (period: string) => {
    const totals = getDiscountTotalsForPeriod(period);
    
    // Calculate the relative distribution of discount types
    const total = totals.loyaltyDiscount + totals.itemDiscount + totals.categoryDiscount;
    const loyaltyPercent = total > 0 ? totals.loyaltyDiscount / total : 0.33;
    const itemPercent = total > 0 ? totals.itemDiscount / total : 0.33;
    const categoryPercent = total > 0 ? totals.categoryDiscount / total : 0.34;
    
    // Create 7 bars showing different combinations of the discount types
    return [
      { values: [loyaltyPercent * 0.9, itemPercent * 0.05, categoryPercent * 0.05] },
      { values: [loyaltyPercent * 0.6, itemPercent * 0.3, categoryPercent * 0.1] },
      { values: [loyaltyPercent * 0.1, itemPercent * 0.8, categoryPercent * 0.1] },
      { values: [loyaltyPercent * 0.4, itemPercent * 0.4, categoryPercent * 0.2] },
      { values: [loyaltyPercent * 0.1, itemPercent * 0.2, categoryPercent * 0.7] },
      { values: [loyaltyPercent * 0.3, itemPercent * 0.5, categoryPercent * 0.2] },
      { values: [loyaltyPercent * 0.8, itemPercent * 0.1, categoryPercent * 0.1] }
    ];
  };
  
  const getLoyaltySegments = (period: string) => {
    const goldCount = getLoyaltyCountForPeriod("GOLD", period);
    const silverCount = getLoyaltyCountForPeriod("SILVER", period);
    const bronzeCount = getLoyaltyCountForPeriod("BRONZE", period);
    const totalCount = goldCount + silverCount + bronzeCount;
    
    return [
      { 
        value: goldCount, 
        color: colors.primary, 
        label: 'Gold',
        count: goldCount,
        percentage: totalCount > 0 ? `${Math.round((goldCount / totalCount) * 100)}%` : '0%'
      },
      { 
        value: silverCount, 
        color: colors.secondary, 
        label: 'Silver',
        count: silverCount,
        percentage: totalCount > 0 ? `${Math.round((silverCount / totalCount) * 100)}%` : '0%'
      },
      { 
        value: bronzeCount, 
        color: colors.tertiary, 
        label: 'Bronze',
        count: bronzeCount,
        percentage: totalCount > 0 ? `${Math.round((bronzeCount / totalCount) * 100)}%` : '0%'
      }
    ];
  };

  const getTotalLoyaltyAmount = (period: string): number => {
    const totals = getDiscountTotalsForPeriod(period);
    return totals.loyaltyDiscount;
  };

  const formatCurrency = (value: number): string => {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatPoints = (points: number): string => {
    return points.toFixed(2);
  };

  const getItemSegments = (period: string) => {
    let periodKey: 'last24Hours' | 'last7Days' | 'last30Days' | 'lastYear';
    if (period === 'custom') {
      return itemDiscountAnalytics.custom?.topItems.slice(0, 5).map((item, index) => {
        const segmentColors = [colors.primary, colors.secondary, colors.tertiary, "#6C757D", "#20c997"];
        return {
          value: item.count,
          color: segmentColors[index % segmentColors.length],
          label: item.itemName,
          percentage: itemDiscountAnalytics.custom?.totalDiscount ? `${Math.round((item.discount / itemDiscountAnalytics.custom.totalDiscount) * 100)}%` : '0%',
          count: item.count
        };
      }) || [];
    } else {
      periodKey = period === "24h" ? "last24Hours" : 
                 period === "7d" ? "last7Days" : 
                 period === "30d" ? "last30Days" : "lastYear";
      
      const items = itemDiscountAnalytics[periodKey as keyof ItemDiscountAnalytics]?.topItems || [];
      
      return items.slice(0, 5).map((item, index) => {
        const segmentColors = [colors.primary, colors.secondary, colors.tertiary, "#6C757D", "#20c997"];
        return {
          value: item.count,
          color: segmentColors[index % segmentColors.length],
          label: item.itemName,
          percentage: itemDiscountAnalytics[periodKey as keyof ItemDiscountAnalytics]?.totalDiscount ? 
            `${Math.round((item.discount / itemDiscountAnalytics[periodKey as keyof ItemDiscountAnalytics]!.totalDiscount) * 100)}%` : '0%',
          count: item.count
        };
      });
    }
  };

  const getItemTotalDiscount = (period: string): string => {
    const totals = getDiscountTotalsForPeriod(period);
    return formatCurrency(totals.itemDiscount);
  };

  const getCategorySegments = (period: string) => {
    let periodKey: 'last24Hours' | 'last7Days' | 'last30Days' | 'lastYear';
    if (period === 'custom') {
      return categoryDiscountAnalytics.custom?.topCategories.slice(0, 5).map((category, index) => {
        const segmentColors = [colors.primary, colors.secondary, colors.tertiary, "#6C757D", "#20c997"];
        return {
          value: category.count,
          color: segmentColors[index % segmentColors.length],
          label: category.categoryName,
          percentage: categoryDiscountAnalytics.custom?.totalDiscount ? 
            `${Math.round((category.discount / categoryDiscountAnalytics.custom.totalDiscount) * 100)}%` : '0%',
          count: category.count,
          discount: category.discount
        };
      }) || [];
    } else {
      periodKey = period === "24h" ? "last24Hours" : 
                 period === "7d" ? "last7Days" : 
                 period === "30d" ? "last30Days" : "lastYear";
      
      const categories = categoryDiscountAnalytics[periodKey as keyof CategoryDiscountAnalytics]?.topCategories || [];
      
      return categories.slice(0, 5).map((category, index) => {
        const segmentColors = [colors.primary, colors.secondary, colors.tertiary, "#6C757D", "#20c997"];
        return {
          value: category.count,
          color: segmentColors[index % segmentColors.length],
          label: category.categoryName,
          percentage: categoryDiscountAnalytics[periodKey as keyof CategoryDiscountAnalytics]?.totalDiscount ? 
            `${Math.round((category.discount / categoryDiscountAnalytics[periodKey as keyof CategoryDiscountAnalytics]!.totalDiscount) * 100)}%` : '0%',
          count: category.count,
          discount: category.discount
        };
      });
    }
  };

  const getCategoryTotalDiscount = (period: string): string => {
    const totals = getDiscountTotalsForPeriod(period);
    return formatCurrency(totals.categoryDiscount);
  };

  const getDiscountPercentage = (type: string, period: string): number => {
    const totals = getDiscountTotalsForPeriod(period);
    const totalDiscount = totals.totalDiscount || 1;
    
    switch(type) {
      case "LOYALTY":
        return Math.round((totals.loyaltyDiscount / totalDiscount) * 100);
      case "ITEM":
        return Math.round((totals.itemDiscount / totalDiscount) * 100);
      case "CATEGORY":
        return Math.round((totals.categoryDiscount / totalDiscount) * 100);
      default:
        return 0;
    }
  };

  const getTotalDiscountAmount = (period: string): string => {
    const totals = getDiscountTotalsForPeriod(period);
    return formatCurrency(totals.totalDiscount);
  };

  const customerData = getCustomerSegments(customersPeriod);
  const loyaltySegments = getLoyaltySegments(loyaltyDiscountPeriod);
  const totalLoyaltyAmount = getTotalLoyaltyAmount(loyaltyDiscountPeriod);

  const loyaltyPercentage = getDiscountPercentage("LOYALTY", loyaltyDiscountPeriod);
  const itemPercentage = getDiscountPercentage("ITEM", popularItemPeriod);
  const categoryPercentage = getDiscountPercentage("CATEGORY", popularCategoryPeriod);

  return (
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={5}>
        <Text fontSize="2xl" fontWeight="bold">Discount Report | Analyzes</Text>
        <Button 
          onClick={onBack}
          leftIcon={<FaArrowLeft />}
          variant="outline"
          size="sm"
        >
          Back to Discounts
        </Button>
      </Flex>
      
      <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="md" p={5}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={6}>
          <GridItem>
            <StatCard
              title="Total Discounts"
              value={`Rs ${getTotalDiscountAmount(totalDiscountPeriod)}`}
              subvalue={`${getTotalDiscountsForPeriod(totalDiscountPeriod)} Discounts Claimed`}
              period={totalDiscountPeriod}
              onPeriodChange={(period, startDate, endDate) => 
                handlePeriodChange('totalDiscount', period, startDate, endDate)
              }
              chart={
                <LineChart 
                  data={createLineChartData(totalDiscountPeriod)} 
                  colors={[colors.primary, colors.secondary, colors.tertiary]} 
                />
              }
              legend={[
                { color: colors.primary, label: 'Loyalty' },
                { color: colors.secondary, label: 'Item' },
                { color: colors.tertiary, label: 'Category' }
              ]}
            />
          </GridItem>
          
          <GridItem>
            <StatCard
              title="Popular Discounts"
              value={`Rs ${getOrderTotalsForPeriod(popularDiscountPeriod).totalAmount.toFixed(2)}`}
              subvalue={`${getOrderCountForPeriod(popularDiscountPeriod)} Orders Placed (${formatPoints(getOrderTotalsForPeriod(popularDiscountPeriod).totalPointsEarned)} Points Issued)`}
              period={popularDiscountPeriod}
              onPeriodChange={(period, startDate, endDate) => 
                handlePeriodChange('popularDiscount', period, startDate, endDate)
              }
              chart={<BarChart data={createBarChartData(popularDiscountPeriod)} colors={[colors.primary, colors.secondary, colors.tertiary]} />}
              legend={[
                { color: colors.primary, label: 'Loyalty' },
                { color: colors.secondary, label: 'Item' },
                { color: colors.tertiary, label: 'Category' }
              ]}
            />
          </GridItem>
          
          <GridItem>
            <StatCard
              title="Total Customers"
              value={customerTierCounts.totalcustomers.toString()}
              subvalue={`${customerData.activeCustomers} Active Customers`}
              period={customersPeriod}
              onPeriodChange={(period, startDate, endDate) => 
                handlePeriodChange('customers', period, startDate, endDate)
              }
              chart={
                <DonutChart 
                  segments={customerData.segments} 
                  centerText={`${customerData.percentage}%`}
                  centerTextColor={getPercentageColor(customerData.percentage)}
                />
              }
              legend={customerData.segments.map(segment => ({
                color: segment.color,
                label: `${segment.label} (${segment.value}) ${segment.percentage}`,
              }))}
            />
          </GridItem>
        </Grid>
        
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem>
            <StatCard
              title="Loyalty Discounts"
              value={`Rs ${formatCurrency(totalLoyaltyAmount)}`}
              subvalue={`${getDiscountCountForPeriod("LOYALTY", loyaltyDiscountPeriod)} Discounts Claimed`}
              period={loyaltyDiscountPeriod}
              onPeriodChange={(period, startDate, endDate) => 
                handlePeriodChange('loyaltyDiscount', period, startDate, endDate)
              }
              chart={
                <DonutChart 
                  segments={loyaltySegments} 
                  centerText={`${loyaltyPercentage}%`} 
                  centerTextColor={getPercentageColor(loyaltyPercentage)}
                />
              }
              legend={loyaltySegments.map(segment => ({
                color: segment.color,
                label: `${segment.label} (${segment.count}) ${segment.percentage}`,
              }))}
            />
          </GridItem>
          
          <GridItem>
            <StatCard
              title="Popular Items"
              value={`Rs ${getItemTotalDiscount(popularItemPeriod)}`}
              subvalue={`${getDiscountCountForPeriod("ITEM", popularItemPeriod)} Discounts Claimed`}
              period={popularItemPeriod}
              onPeriodChange={(period, startDate, endDate) => 
                handlePeriodChange('popularItem', period, startDate, endDate)
              }
              chart={
                <DonutChart 
                  segments={getItemSegments(popularItemPeriod)} 
                  centerText={`${itemPercentage}%`}
                  centerTextColor={getPercentageColor(itemPercentage)}
                />
              }
              legend={getItemSegments(popularItemPeriod).map((segment: { color: any; label: any; count: any; percentage: any; }) => ({
                color: segment.color,
                label: segment.label,
                count: segment.count,
                percentage: segment.percentage
              }))}
            />
          </GridItem>
          
          <GridItem>
            <StatCard
              title="Popular Categories"
              value={`Rs ${getCategoryTotalDiscount(popularCategoryPeriod)}`}
              subvalue={`${getDiscountCountForPeriod("CATEGORY", popularCategoryPeriod)} Discounts Claimed`}
              period={popularCategoryPeriod}
              onPeriodChange={(period, startDate, endDate) => 
                handlePeriodChange('popularCategory', period, startDate, endDate)
              }
              chart={
                <DonutChart 
                  segments={getCategorySegments(popularCategoryPeriod)} 
                  centerText={`${categoryPercentage}%`}
                  centerTextColor={getPercentageColor(categoryPercentage)}
                />
              }
              legend={getCategorySegments(popularCategoryPeriod).map((segment: { color: any; label: any; count: any; percentage: any; }) => ({
                color: segment.color,
                label: segment.label,
                count: segment.count,
                percentage: segment.percentage
              }))}
            />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default DiscountReport;