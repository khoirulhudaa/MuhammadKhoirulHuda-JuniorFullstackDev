export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Seller" | "Pelanggan";
  phone?: string;
  address?: string;
  status: "ACTIVE" | "INACTIVE";
  joinDate: string; 
}

export type UserRole = User["role"];