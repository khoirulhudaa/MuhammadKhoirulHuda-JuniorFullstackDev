// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Seller" | "Pelanggan";
  phone?: string;
  address?: string;
  status: "ACTIVE" | "INACTIVE";
  joinDate: string; // created_at dari backend
}

export type UserRole = User["role"];