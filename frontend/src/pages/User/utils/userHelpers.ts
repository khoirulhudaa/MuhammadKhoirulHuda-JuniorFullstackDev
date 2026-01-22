// src/utils/userHelpers.ts
import { User } from "../types/user";

export const roleLabels: Record<User["role"], string> = {
  Admin: "Admin",
  Seller: "Penjual",
  Pelanggan: "Pelanggan",
};

export const formatDate = (isoString: string): string => {
  try {
    return new Date(isoString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "-";
  }
};