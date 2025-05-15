// src/models/Discount.ts
export default interface Discount {
  id?: number; 
  name: string;
  type: 'ITEM' | 'CATEGORY' | 'LOYALTY'; 
  itemId?: number | null;
  categoryId?: number | null;
  loyaltyType?: 'GOLD' | 'SILVER' | 'BRONZE' | null;
  amount?: number | null;
  percentage?: number | null;
  startDate?: string; 
  isActive: boolean;
  duration: string;
  remainingTime?: string;
  
}