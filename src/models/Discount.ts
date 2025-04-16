// src/models/Discount.ts
export default interface Discount {
  id?: number; // Make optional for new discounts
  name: string;
  type: 'ITEM' | 'CATEGORY' | 'LOYALTY'; // Match backend enum
  itemId?: number | null;
  categoryId?: number | null;
  loyaltyType?: 'GOLD' | 'SILVER' | 'BRONZE' | null;
  amount?: number | null;
  percentage?: number | null;
  startDate?: string; // Optional as backend will likely set this
  isActive: boolean;
  duration: string;
  remainingTime?: string;
  
}