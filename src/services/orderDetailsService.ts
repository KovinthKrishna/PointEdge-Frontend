import APIClient from "./apiClient2";

const orderCountsClient = new APIClient("/discount/analytics/orders/count");
const discountCountsByTypeClient = new APIClient("/discount/analytics/discounts/count-by-type");
const customerTierCountsClient = new APIClient("/discount/analytics/customers/count-by-tier");
const loyaltyDiscountClient = new APIClient("/discount/analytics/loyalty-discounts/by-tier");
const itemDiscountAnalyticsClient = new APIClient("/discount/analytics/item-discounts/analytics");
const categoryDiscountAnalyticsClient = new APIClient("/discount/analytics/category-discounts/analytics");
const discountTotalsClient = new APIClient("/discount/analytics/discounts/totals");
const orderTotalsClient = new APIClient("/discount/analytics/orders/total-amount");

interface OrderCounts {
  last24Hours: number;
  last7Days: number;
  last30Days: number;
  lastYear: number;
}

export interface DiscountCountsByType {
  ITEM: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
  };
  CATEGORY: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
  };
  LOYALTY: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
  };
}

export interface LoyaltyDiscountData {
  GOLD: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
  };
  SILVER: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
  };
  BRONZE: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
  };
  NOTLOYALTY: {
    last24Hours: number;
    last7Days: number;
    last30Days: number;
    lastYear: number;
  };
  totaldiscount: {
    goldtotaldiscount: number;
    silvertotaldiscount: number;
    bronzetotaldiscount: number;
  };
}

interface CustomerTierCounts {
  totalcustomers: number;
  GOLD: {
    last24Hours: number;
    last30Days: number;
    lastYear: number;
    last7Days: number;
  };
  SILVER: {
    last24Hours: number;
    last30Days: number;
    lastYear: number;
    last7Days: number;
  };
  BRONZE: {
    last24Hours: number;
    last30Days: number;
    lastYear: number;
    last7Days: number;
  };
  NOTLOYALTY: {
    last24Hours: number;
    last30Days: number;
    lastYear: number;
    last7Days: number;
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
}


// Add this to your interfaces in orderDetailsService.ts
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
}

// Fetch order counts for different time periods
export const fetchOrderCounts = async (): Promise<OrderCounts> => {
  try {
    const response = await orderCountsClient.getAll();
    return response as OrderCounts;
  } catch (error) {
    console.error('Error fetching order counts:', error);
    return {
      last24Hours: 0,
      last7Days: 0,
      last30Days: 0,
      lastYear: 0
    };
  }
};

// Fetch discount counts by type for different time periods
export const fetchDiscountCountsByType = async (): Promise<DiscountCountsByType> => {
  try {
    const response = await discountCountsByTypeClient.getAll();
    return response as DiscountCountsByType;
  } catch (error) {
    console.error('Error fetching discount counts by type:', error);
    return {
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
  }
};

// Fetch customer tier counts for different time periods
export const fetchCustomerTierCounts = async (): Promise<CustomerTierCounts> => {
  try {
    const response = await customerTierCountsClient.getAll();
    return response as CustomerTierCounts;
  } catch (error) {
    console.error('Error fetching customer tier counts:', error);
    return {
      totalcustomers: 0,
      GOLD: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 },
      SILVER: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 },
      BRONZE: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 },
      NOTLOYALTY: { last24Hours: 0, last30Days: 0, lastYear: 0, last7Days: 0 }
    };
  }
};

// Fetch loyalty discount data by tier
export const fetchLoyaltyDiscountByTier = async (): Promise<LoyaltyDiscountData> => {
  try {
    const response = await loyaltyDiscountClient.getAll();
    return response as LoyaltyDiscountData;
  } catch (error) {
    console.error('Error fetching loyalty discount data by tier:', error);
    return {
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
  }
};

// fetch total item discount analytics for different time periods

export const fetchItemDiscountAnalytics = async (): Promise<ItemDiscountAnalytics> => {
    try {
      const response = await itemDiscountAnalyticsClient.getAll();
      return response as ItemDiscountAnalytics;
    } catch (error) {
      console.error('Error fetching item discount analytics:', error);
      return {
        last24Hours: { totalAmount: 0, totalDiscount: 0, topItems: [] },
        last7Days: { totalAmount: 0, totalDiscount: 0, topItems: [] },
        last30Days: { totalAmount: 0, totalDiscount: 0, topItems: [] },
        lastYear: { totalAmount: 0, totalDiscount: 0, topItems: [] }
      };
    }
};

// fetch total category discount analytics for different time periods

export const fetchCategoryDiscountAnalytics = async (): Promise<CategoryDiscountAnalytics> => {
    try {
      const response = await categoryDiscountAnalyticsClient.getAll();
      return response as CategoryDiscountAnalytics;
    } catch (error) {
      console.error('Error fetching category discount analytics:', error);
      return {
        last24Hours: { totalAmount: 0, totalDiscount: 0, topCategories: [] },
        last7Days: { totalAmount: 0, totalDiscount: 0, topCategories: [] },
        last30Days: { totalAmount: 0, totalDiscount: 0, topCategories: [] },
        lastYear: { totalAmount: 0, totalDiscount: 0, topCategories: [] }
      };
    }
};

// fetch total discount totals for different time periods

export const fetchDiscountTotals = async (): Promise<DiscountTotals> => {
    try {
      const response = await discountTotalsClient.getAll();
      return response as DiscountTotals;
    } catch (error) {
      console.error('Error fetching discount totals:', error);
      return {
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
    }
};

// fetch total amounts

export const fetchOrderTotals = async (): Promise<OrderTotals> => {
    try {
        const response = await orderTotalsClient.getAll();
        return response as OrderTotals;
    } catch (error) {
        console.error('Error fetching order totals:', error);
        return {
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
    }
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