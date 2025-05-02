import axios from "axios";
import APIClient from "./apiClient2";
import Customer from "../models/Customer";

// Base clients for customer operations
const customerClient = new APIClient("/discount/customer/add-customer");
const allCustomersClient = new APIClient<Customer[]>("/discount/customer/get-all-customers");
const singleCustomerClient = new APIClient<Customer>("/discount/customer/get-customer");
const customerCountClient = new APIClient<number>("/discount/customer/count");


// Add a new customer
export const addCustomer = async (customerData: Customer): Promise<Customer> => {
  try {
    return await customerClient.post(customerData);
  } catch (error) {
    console.error('Error adding customer:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to add customer';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Fetch all customers
export const fetchAllCustomers = async (): Promise<Customer[]> => {
  try {
    return await allCustomersClient.getAll();
  } catch (error) {
    console.error('Error fetching all customers:', error);
    throw error;
  }
};

// Get a single customer by ID
export const getCustomerById = async (id: number): Promise<Customer> => {
  try {
    return await singleCustomerClient.get(id);
  } catch (error) {
    console.error(`Error fetching customer with ID ${id}:`, error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch customer';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Update an existing customer
export const updateCustomer = async (id: number, customerData: Customer): Promise<Customer> => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/discount/customer/update-customer-by-id/${id}`,
      customerData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to update customer';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Delete a single customer by ID
export const deleteCustomer = async (customerId: number): Promise<{ success: boolean, message?: string }> => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/discount/customer/delete-customer/${customerId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    
    console.log(`Customer with ID ${customerId} deleted successfully`);
    return { success: true, message: 'Customer deleted successfully' };
  } catch (error) {
    console.error(`Error deleting customer with ID ${customerId}:`, error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to delete customer';
      return { success: false, message: errorMessage };
    }
    return { success: false, message: 'An unexpected error occurred' };
  }
};

// Fetch customer count
export const fetchCustomerCount = async (): Promise<number> => {
  try {
    const response = await customerCountClient.getAll();
    return response;
  } catch (error) {
    console.error('Error fetching customer count:', error);
    return 0;
  }
};

// Search customers by phone, email, or name
export const searchCustomers = async (
  searchTerm: string
): Promise<Customer[]> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/discount/customer/search`,
      {
        params: { query: searchTerm },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error searching customers:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to search customers';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// services/customerService.ts

// Get a single customer by phone number
export const getCustomerByPhone = async (phone: string): Promise<Customer> => {
  const formattedPhone = phone.startsWith('0') ? phone : `0${phone}`;
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/discount/customer/get-customer/${formattedPhone}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer with phone ${phone}:`, error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch customer';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const deleteCustomer2 = async (phone: string): Promise<{ success: boolean, message?: string }> => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/discount/customer/delete-customer/${phone}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    
    console.log('Delete Response:', response.data); // Debug log
    return { 
      success: response.status === 200,
      message: response.data 
    };
  } catch (error) {
    console.error('Delete Error:', error);
    if (axios.isAxiosError(error)) {
      return { 
        success: false, 
        message: error.response?.data || error.message 
      };
    }
    return { success: false, message: 'Unknown error occurred' };
  }
};

// Update an existing customer by ID
export const updateCustomerById = async (id: number, customerData: Customer): Promise<Customer> => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/discount/customer/update-customer/${id}`,
      customerData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    console.log(`Customer with ID ${id} updated successfully`);
    return response.data;
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to update customer';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// fetch coustomer count by tier

// Add this to your customerService.ts
export const fetchCustomerCountsByTier = async (): Promise<{
  GOLD: number;
  SILVER: number;
  BRONZE: number;
  NOTLOYALTY: number;
}> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/discount/customer/count-by-tier`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching customer counts by tier:', error);
    return {
      GOLD: 0,
      SILVER: 0,
      BRONZE: 0,
      NOTLOYALTY: 0
    };
  }
};

// fetch tier by phone number

// In services/customerService.ts
export const getCustomerTierByPhone = async (phone: string): Promise<string> => {
  const formattedPhone = phone.startsWith('0') ? phone : `0${phone}`;
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/discount/customer/get-tier/${formattedPhone}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer tier with phone ${phone}:`, error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch customer tier';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// fetch orders

// Add this to your customerService.ts file

interface OrderData {
  id: string;
  date: string;
  items: number;
  amount: number;
  points: number;
}

// Add this to your customerService.ts file

export const fetchCustomerOrders = async (phone: string): Promise<OrderData[]> => {
  const formattedPhone = phone.startsWith('0') ? phone : `0${phone}`;
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/discount/customer/orders/grouped/${formattedPhone}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    
    // Map the response data to the OrderData interface
    return response.data.map((order: any) => ({
      id: order.orderId || 0,
      date: order.orderDateTime || new Date().toLocaleString(),
      items: typeof order.itemCount === 'number' ? order.itemCount : 0,
      amount: typeof order.totalAmount === 'number' ? order.totalAmount : 0,
      points: typeof order.totalPointsEarned === 'number' ? order.totalPointsEarned : 0
    }));
  } catch (error) {
    console.error(`Error fetching orders for customer with phone ${phone}:`, error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch orders';
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export default customerClient;