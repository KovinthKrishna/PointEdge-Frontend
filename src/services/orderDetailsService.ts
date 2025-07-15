import APIClient from "./apiClient2";

const orderCountsClient = new APIClient("/discount/analytics/orders/count");
const discountCountsByTypeClient = new APIClient("/discount/analytics/discounts/count-by-type");
const customerTierCountsClient = new APIClient("/discount/analytics/customers/count-by-tier");
const loyaltyDiscountClient = new APIClient("/discount/analytics/loyalty-discounts/by-tier");
const itemDiscountAnalyticsClient = new APIClient("/discount/analytics/item-discounts/analytics");
const categoryDiscountAnalyticsClient = new APIClient("/discount/analytics/category-discounts/analytics");
const discountTotalsClient = new APIClient("/discount/analytics/discounts/totals");
const orderTotalsClient = new APIClient("/discount/analytics/orders/total-amount");

const customOrderCountsClient = new APIClient("/discount/analytics/orders/count/custom");
const customDiscountCountsByTypeClient = new APIClient("/discount/analytics/discounts/count-by-type/custom");
const customCustomerTierCountsClient = new APIClient("/discount/analytics/customers/count-by-tier/custom");
const customLoyaltyDiscountClient = new APIClient("/discount/analytics/loyalty-discounts/by-tier/custom");
const customItemDiscountAnalyticsClient = new APIClient("/discount/analytics/item-discounts/analytics/custom");
const customCategoryDiscountAnalyticsClient = new APIClient("/discount/analytics/category-discounts/analytics/custom");
const customDiscountTotalsClient = new APIClient("/discount/analytics/discounts/totals/custom");
const customOrderTotalsClient = new APIClient("/discount/analytics/orders/total-amount/custom");

interface OrderCounts {
  last24Hours: number;
  last7Days: number;
  last30Days: number;
  lastYear: number;
  custom?: number;
}

export interface DiscountCountsByType {
  ITEM: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
    custom?: number;
  };
  CATEGORY: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
    custom?: number;
  };
  LOYALTY: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
    custom?: number;
  };
}

export interface LoyaltyDiscountData {
  GOLD: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
    custom?: number;
  };
  SILVER: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
    custom?: number;
  };
  BRONZE: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
    custom?: number;
  };
  NOTLOYALTY: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
    custom?: number;
  };
  totaldiscount: {
    goldtotaldiscount: number;
    silvertotaldiscount: number;
    bronzetotaldiscount: number;
    custom?: number;
  };
}

interface CustomerTierCounts {
  totalcustomers: number;
  GOLD: {
    last24Hours: number;
    last30Days: number;
    lastYear: number;
    last7Days: number;
    custom?: number;
  };
  SILVER: {
    last24Hours: number;
    last30Days: number;
    lastYear: number;
    last7Days: number;
    custom?: number;
  };
  BRONZE: {
    last24Hours: number;
    last30Days: number;
    lastYear: number;
    last7Days: number;
    custom?: number;
  };
  NOTLOYALTY: {
    last24Hours: number;
    last30Days: number;
    lastYear: number;
    last7Days: number;
    custom?: number;
  };
}

export interface ItemDiscountAnalytics {
  last24Hours: {
    totalAmount: number;
    totalDiscount: number;
    topItems: ItemDetail[];
  };
  last7Days: {
    totalAmount: number;
    totalDiscount: number;
    topItems: ItemDetail[];
  };
  last30Days: {
    totalAmount: number;
    totalDiscount: number;
    topItems: ItemDetail[];
  };
  lastYear: {
    totalAmount: number;
    totalDiscount: number;
    topItems: ItemDetail[];
  };
  custom?: {
    totalAmount: number;
    totalDiscount: number;
    topItems: ItemDetail[];
  };
}

export interface ItemDetail {
  itemId: number;
  itemName: string;
  amount: number;
  discount: number;
  count: number;
}

export interface CategoryDiscountAnalytics {
  last24Hours: {
    totalAmount: number;
    totalDiscount: number;
    topCategories: CategoryDetail[];
  };
  last7Days: {
    totalAmount: number;
    totalDiscount: number;
    topCategories: CategoryDetail[];
  };
  last30Days: {
    totalAmount: number;
    totalDiscount: number;
    topCategories: CategoryDetail[];
  };
  lastYear: {
    totalAmount: number;
    totalDiscount: number;
    topCategories: CategoryDetail[];
  };
  custom?: {
    totalAmount: number;
    totalDiscount: number;
    topCategories: CategoryDetail[];
  };
}

export interface CategoryDetail {
  categoryId: number;
  categoryName: string;
  amount: number;
  discount: number;
  count: number;
}

export interface DiscountTotals {
  last24Hours: {
    categoryDiscount: number;
    loyaltyDiscount: number;
    itemDiscount: number;
    totalDiscount: number;
  };
  last7Days: {
    categoryDiscount: number;
    loyaltyDiscount: number;
    itemDiscount: number;
    totalDiscount: number;
  };
  last30Days: {
    categoryDiscount: number;
    loyaltyDiscount: number;
    itemDiscount: number;
    totalDiscount: number;
  };
  lastYear: {
    categoryDiscount: number;
    loyaltyDiscount: number;
    itemDiscount: number;
    totalDiscount: number;
  };
  custom?: {
    categoryDiscount: number;
    loyaltyDiscount: number;
    itemDiscount: number;
    totalDiscount: number;
  };
}

export interface OrderTotals {
  last24Hours: {
    totalAmount: number;
    totalCategoryAmount: number;
    totalLoyaltyAmount: number;
    totalPointsEarned: number;
    totalItemAmount: number;
  };
  last7Days: {
    totalAmount: number;
    totalCategoryAmount: number;
    totalLoyaltyAmount: number;
    totalPointsEarned: number;
    totalItemAmount: number;
  };
  last30Days: {
    totalAmount: number;
    totalCategoryAmount: number;
    totalLoyaltyAmount: number;
    totalPointsEarned: number;
    totalItemAmount: number;
  };
  lastYear: {
    totalAmount: number;
    totalCategoryAmount: number;
    totalLoyaltyAmount: number;
    totalPointsEarned: number;
    totalItemAmount: number;
  };
  custom?: {
    totalAmount: number;
    totalCategoryAmount: number;
    totalLoyaltyAmount: number;
    totalPointsEarned: number;
    totalItemAmount: number;
  };
}

// Helper function to handle API calls with custom date ranges
const fetchWithCustomRange = async <T>(
  client: APIClient,
  customClient: APIClient,
  defaultResponse: T,
  period?: string,
  startDate?: string,
  endDate?: string
): Promise<T> => {
  try {
    if (period === 'custom' && startDate && endDate) {
      // Use the custom endpoint with date parameters
      const response = await customClient.getAll({
        params: {
          start: startDate,
          end: endDate
        }
      });
      
      // Merge the custom response with the default structure
      return {
        ...defaultResponse,
        custom: response
      } as T;
    } else {
      // Use the regular endpoint for fixed time periods
      const response = await client.getAll();
      return response as T;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return defaultResponse;
  }
};

// Fetch order counts for different time periods
export const fetchOrderCounts = async (
  period?: string,
  startDate?: string,
  endDate?: string
): Promise<OrderCounts> => {
  const defaultResponse: OrderCounts = {
    last24Hours: 0,
    last7Days: 0,
    last30Days: 0,
    lastYear: 0
  };
  
  return fetchWithCustomRange<OrderCounts>(
    orderCountsClient,
    customOrderCountsClient,
    defaultResponse,
    period,
    startDate,
    endDate
  );
};

// Fetch discount counts by type for different time periods
export const fetchDiscountCountsByType = async (
  period?: string,
  startDate?: string,
  endDate?: string
): Promise<DiscountCountsByType> => {
  const defaultResponse: DiscountCountsByType = {
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
  };
  
  return fetchWithCustomRange<DiscountCountsByType>(
    discountCountsByTypeClient,
    customDiscountCountsByTypeClient,
    defaultResponse,
    period,
    startDate,
    endDate
  );
};

// Fetch customer tier counts for different time periods
export const fetchCustomerTierCounts = async (
  period?: string,
  startDate?: string,
  endDate?: string
): Promise<CustomerTierCounts> => {
  const defaultResponse: CustomerTierCounts = {
    totalcustomers: 0,
    GOLD: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 },
    SILVER: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 },
    BRONZE: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 },
    NOTLOYALTY: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 }
  };
  
  return fetchWithCustomRange<CustomerTierCounts>(
    customerTierCountsClient,
    customCustomerTierCountsClient,
    defaultResponse,
    period,
    startDate,
    endDate
  );
};

// Fetch loyalty discount data by tier
export const fetchLoyaltyDiscountByTier = async (
  period?: string,
  startDate?: string,
  endDate?: string
): Promise<LoyaltyDiscountData> => {
  const defaultResponse: LoyaltyDiscountData = {
    GOLD: { last24Hours: 0, last7Days: 0, last30Days: 0, lastYear: 0 },
    SILVER: { last24Hours: 0, last7Days: 0, last30Days: 0, lastYear: 0 },
    BRONZE: { last24Hours: 0, last7Days: 0, last30Days: 0, lastYear: 0 },
    NOTLOYALTY: { last24Hours: 0, last7Days: 0, last30Days: 0, lastYear: 0 },
    totaldiscount: {
      goldtotaldiscount: 0,
      silvertotaldiscount: 0,
      bronzetotaldiscount: 0
    }
  };
  
  return fetchWithCustomRange<LoyaltyDiscountData>(
    loyaltyDiscountClient,
    customLoyaltyDiscountClient,
    defaultResponse,
    period,
    startDate,
    endDate
  );
};

// Fetch item discount analytics for different time periods
export const fetchItemDiscountAnalytics = async (
  period?: string,
  startDate?: string,
  endDate?: string
): Promise<ItemDiscountAnalytics> => {
  const defaultResponse: ItemDiscountAnalytics = {
    last24Hours: { totalAmount: 0, totalDiscount: 0, topItems: [] },
    last7Days: { totalAmount: 0, totalDiscount: 0, topItems: [] },
    last30Days: { totalAmount: 0, totalDiscount: 0, topItems: [] },
    lastYear: { totalAmount: 0, totalDiscount: 0, topItems: [] }
  };
  
  return fetchWithCustomRange<ItemDiscountAnalytics>(
    itemDiscountAnalyticsClient,
    customItemDiscountAnalyticsClient,
    defaultResponse,
    period,
    startDate,
    endDate
  );
};

// Fetch category discount analytics for different time periods
export const fetchCategoryDiscountAnalytics = async (
  period?: string,
  startDate?: string,
  endDate?: string
): Promise<CategoryDiscountAnalytics> => {
  const defaultResponse: CategoryDiscountAnalytics = {
    last24Hours: { totalAmount: 0, totalDiscount: 0, topCategories: [] },
    last7Days: { totalAmount: 0, totalDiscount: 0, topCategories: [] },
    last30Days: { totalAmount: 0, totalDiscount: 0, topCategories: [] },
    lastYear: { totalAmount: 0, totalDiscount: 0, topCategories: [] }
  };
  
  return fetchWithCustomRange<CategoryDiscountAnalytics>(
    categoryDiscountAnalyticsClient,
    customCategoryDiscountAnalyticsClient,
    defaultResponse,
    period,
    startDate,
    endDate
  );
};

// Fetch discount totals for different time periods
export const fetchDiscountTotals = async (
  period?: string,
  startDate?: string,
  endDate?: string
): Promise<DiscountTotals> => {
  const defaultResponse: DiscountTotals = {
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
  };
  
  return fetchWithCustomRange<DiscountTotals>(
    discountTotalsClient,
    customDiscountTotalsClient,
    defaultResponse,
    period,
    startDate,
    endDate
  );
};

// Fetch order totals for different time periods
export const fetchOrderTotals = async (
  period?: string,
  startDate?: string,
  endDate?: string
): Promise<OrderTotals> => {
  const defaultResponse: OrderTotals = {
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
  };
  
  return fetchWithCustomRange<OrderTotals>(
    orderTotalsClient,
    customOrderTotalsClient,
    defaultResponse,
    period,
    startDate,
    endDate
  );
};

export default {
  fetchOrderCounts,
  fetchDiscountCountsByType,
  fetchCustomerTierCounts,
  fetchLoyaltyDiscountByTier,
  fetchItemDiscountAnalytics,
  fetchCategoryDiscountAnalytics,
  fetchDiscountTotals,
  fetchOrderTotals
};

export type { CustomerTierCounts };