import axios from "axios";
import APIClient from "./apiClient2";
import Discount from "../models/Discount";

// Base client for discount operations
const discountClient = new APIClient("/discount/add-discount");
const productNamesClient = new APIClient("/discount/product-names");
const categoryNamesClient = new APIClient("/discount/category-names");
const discountNamesClient = new APIClient("/discount/discount-names");
const deleteAllDiscountsClient = new APIClient("/discount/delete-all-discounts");
const deleteItemDiscountsClient = new APIClient("/discount/delete-discounts-by-type/ITEM");
const deleteCategoryDiscountsClient = new APIClient("/discount/delete-discounts-by-type/CATEGORY");
const deleteLoyaltyDiscountsClient = new APIClient("/discount/delete-discounts-by-type/LOYALTY");
const discountItemCountClient = new APIClient("/discount/count-by-type/ITEM"); 
const discountCategoryCountClient = new APIClient("/discount/count-by-type/CATEGORY");
const discountLoyaltyCountClient = new APIClient("/discount/count-by-type/LOYALTY");
const loyaltyThresholdsClient = new APIClient("/discount/loyalty-thresholds");
const allDiscountsClient = new APIClient<Discount[]>("/discount/get-all-discounts");
const singleDiscountClient = new APIClient<Discount>("/discount/get-discount-by-id");
const discountItemsClient = new APIClient<Discount[]>("/discount/get-discounts-by-type/ITEM");
const discountCategoriesClient = new APIClient<Discount[]>("/discount/get-discounts-by-type/CATEGORY");
const discountLoyaltiesClient = new APIClient<Discount[]>("/discount/get-discounts-by-type/LOYALTY");

// Fetch product names function
export const fetchProductNames = async (): Promise<Array<{id: number, name: string}>> => {
  try {
    const response = await productNamesClient.getAll();
    
    if (Array.isArray(response)) {
      if (typeof response[0] === 'string') {
        return response.map((name, index) => ({ id: index + 1, name }));
      } else if (response[0]?.id && response[0]?.name) {
        return response;
      }
    }
    
    return [
      {id: 1, name: 'Product 1'},
      {id: 2, name: 'Product 2'},
      {id: 3, name: 'Product 3'}
    ];
  } catch (error) {
    console.error('Error fetching product names:', error);
    return [
      {id: 1, name: 'Product 1'},
      {id: 2, name: 'Product 2'},
      {id: 3, name: 'Product 3'}
    ];
  }
};


// Fetch category names function
export const fetchCategoryNames = async (): Promise<Array<{id: number, name: string}>> => {
  try {
    const response = await categoryNamesClient.getAll();

    if (Array.isArray(response)) {
      if (typeof response[0] === 'string') {
        return response.map((name, index) => ({ id: index + 1, name }));
      } else if (response[0]?.id && response[0]?.name) {
        return response;
      }
    }
    
    return [
      {id: 1, name: 'Category 1'},
      {id: 2, name: 'Category 2'},
      {id: 3, name: 'Category 3'}
    ];
  } catch (error) {
    console.error('Error fetching Category names:', error);
    return [
      {id: 1, name: 'Category 1'},
      {id: 2, name: 'Category 2'},
      {id: 3, name: 'Category 3'}
    ];
  }
};

// Fetch discount names function
export const fetchDiscountNames = async () => {
  try {
    return await discountNamesClient.getAll();
  } catch (error) {
    console.error('Error fetching discount names:', error);
    return ['Discount 1', 'Discount 2', 'Special Offer', 'Seasonal Sale'];
  }
};

// Delete all discounts function
export const deleteAllDiscounts = async (adminPassword: string): Promise<{ success: boolean, message?: string }> => {
  try {
    const data = await deleteAllDiscountsClient.post({ adminPassword });
    console.log("Deletion successful:", data);
    return data;
  } catch (error) {
    console.error('Error in deleteAllDiscounts:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to delete discounts';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Delete all ITEM type discounts function
export const deleteAllItemDiscounts = async (adminPassword: string): Promise<{ success: boolean, message?: string }> => {
  try {
    const data = await deleteItemDiscountsClient.post({ adminPassword });
    console.log("Item discounts deletion successful:", data);
    return data;
  } catch (error) {
    console.error('Error in deleteAllItemDiscounts:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to delete item discounts';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Delete all CATEGORY type discounts function
export const deleteAllCategoryDiscounts = async (adminPassword: string): Promise<{ success: boolean, message?: string }> => {
  try {
    const data = await deleteCategoryDiscountsClient.post({ adminPassword });
    console.log("Category discounts deletion successful:", data);
    return data;
  } catch (error) {
    console.error('Error in deleteAllCategoryDiscounts:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to delete category discounts';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Delete all LOYALTY type discounts function
export const deleteAllLoyaltyDiscounts = async (adminPassword: string): Promise<{ success: boolean, message?: string }> => {
  try {
    const data = await deleteLoyaltyDiscountsClient.post({ adminPassword });
    console.log("Loyalty discounts deletion successful:", data);
    return data;
  } catch (error) {
    console.error('Error in deleteAllLoyaltyDiscounts:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to delete Loyalty discounts';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Fetch ITEM discount count function
export const fetchItemDiscountCount = async () => {
    try {
      const response = await discountItemCountClient.getAll();
      return {
        type: 'ITEM',
        count: typeof response === 'number' ? response : response?.count || 0
      };
    } catch (error) {
      console.error('Error fetching item discount count:', error);
      return {
        type: 'ITEM',
        count: 0
      };
    }
};

// Fetch CATEGORY discount count function
export const fetchCategoryDiscountCount = async () => {
    try {
      const response = await discountCategoryCountClient.getAll();
      return {
        type: 'CATEGORY',
        count: typeof response === 'number' ? response : response?.count || 0
      };
    } catch (error) {
      console.error('Error fetching category discount count:', error);
      return {
        type: 'CATEGORY',
        count: 0
      };
    }
};

// Fetch LOYALTY discount count function
export const fetchLoyaltyDiscountCount = async () => {
    try {
      const response = await discountLoyaltyCountClient.getAll();
      return {
        type: 'LOYALTY',
        count: typeof response === 'number' ? response : response?.count || 0
      };
    } catch (error) {
      console.error('Error fetching loyalty discount count:', error);
      return {
        type: 'LOYALTY',
        count: 0
      };
    }
};

// Fetch discount count function
export const fetchDiscountCount = async () => {
    try {
      const response1 = await fetchItemDiscountCount();
      const t1 = response1.count;
      const response2 = await fetchCategoryDiscountCount();
      const t2 = response2.count;
      const response3 = await fetchLoyaltyDiscountCount();
      const t3 = response3.count;
      return {
        type: '',
        count: t1 + t2 + t3
      };
    } catch (error) {
      console.error('Error fetching discount count:', error);
      return {
        type: '',
        count: 0
      };
    }
};

interface LoyaltyThresholds {
  gold: number;
  silver: number;
  bronze: number;
  points: number;
}

// Fetch current loyalty thresholds
export const fetchLoyaltyThresholds = async (): Promise<LoyaltyThresholds> => {
  try {
    return await loyaltyThresholdsClient.getAll();
  } catch (error) {
    console.error('Error fetching loyalty thresholds:', error);
    return {
      gold: 10000,
      silver: 5000,
      bronze: 2500,
      points: 1
    };
  }
};

// Update loyalty thresholds
export const updateLoyaltyThresholds = async (thresholds: LoyaltyThresholds): Promise<LoyaltyThresholds> => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/discount/loyalty-thresholds`,
      thresholds,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating loyalty thresholds:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to update loyalty thresholds';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Fetch all discounts function
export const fetchAllDiscounts = async (): Promise<Discount[]> => {
  try {
    return await allDiscountsClient.getAll();
  } catch (error) {
    console.error('Error fetching all discounts:', error);
    throw error;
  }
};

// Get a single discount by ID
export const getDiscountById = async (id: number): Promise<Discount> => {
  try {
    return await singleDiscountClient.get(id);
  } catch (error) {
    console.error(`Error fetching discount with ID ${id}:`, error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch discount';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Update an existing discount
export const updateDiscount = async (id: number, discountData: Discount): Promise<Discount> => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/discount/update-discount-by-id/${id}`,
      discountData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating discount with ID ${id}:`, error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to update discount';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Delete a single discount by ID
export const deleteDiscount = async (discountId: number): Promise<{ success: boolean, message?: string }> => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/discount/delete-discount-by-id/${discountId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    console.log(`Discount with ID ${discountId} deleted successfully`);
    return { success: true, message: 'Discount deleted successfully' };
  } catch (error) {
    console.error(`Error deleting discount with ID ${discountId}:`, error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to delete discount';
      return { success: false, message: errorMessage };
    }
    return { success: false, message: 'An unexpected error occurred' };
  }
};

// Fetch all item discounts function
export const fetchItemDiscounts = async (): Promise<Discount[]> => {
  try {
    const discounts = await discountItemsClient.getAll();
    return discounts;
  } catch (error) {
    console.error('Error fetching item discounts:', error);
    return [];
  }
};

// Fetch all Category discounts function
export const fetchCategoryDiscounts = async (): Promise<Discount[]> => {
  try {
    const discounts = await discountCategoriesClient.getAll();
    return discounts;
  } catch (error) {
    console.error('Error fetching Category discounts:', error);
    return [];
  }
};

// Fetch all Loyalty discounts function
export const fetchLoyaltyDiscounts = async (): Promise<Discount[]> => {
  try {
    const discounts = await discountLoyaltiesClient.getAll();
    return discounts;
  } catch (error) {
    console.error('Error fetching Loyalty discounts:', error);
    return [];
  }
};

export default discountClient;