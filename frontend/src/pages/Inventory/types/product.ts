export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number; // di FE number (meski di DB mungkin decimal)
  created_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Seller" | "Pelanggan";
}