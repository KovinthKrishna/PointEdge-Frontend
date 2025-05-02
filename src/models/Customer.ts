export default interface Customer {
  id?: number; 
  name: string;
  title: 'MR' | 'MRS' | 'OTHER';
  email?: string | null; 
  phone: string;
  points: number;
  tier: 'GOLD' | 'SILVER' | 'BRONZE' | 'NOTLOYALTY';
}