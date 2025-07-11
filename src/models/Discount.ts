// src/models/Discount.ts
export default interface Discount {
<<<<<<< HEAD
  id?: number; // Make optional for new discounts
  name: string;
  type: 'ITEM' | 'CATEGORY' | 'LOYALTY'; // Match backend enum
=======
  id?: number; 
  name: string;
  type: 'ITEM' | 'CATEGORY' | 'LOYALTY'; 
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  itemId?: number | null;
  categoryId?: number | null;
  loyaltyType?: 'GOLD' | 'SILVER' | 'BRONZE' | null;
  amount?: number | null;
  percentage?: number | null;
<<<<<<< HEAD
  startDate?: string; // Optional as backend will likely set this
=======
  startDate?: string; 
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  isActive: boolean;
  duration: string;
  remainingTime?: string;
  
}