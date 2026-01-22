// src/hooks/useUserManagement.ts
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { User, UserRole } from "../types/user";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5005";

export const useUserManagement = () => {
  // Auth & Current User
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const isAdmin = currentUser?.role === "Admin";

  // Data Users
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchUsers = async () => {
    if (!isAdmin || isFetching) return;

    setIsFetching(true);
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Anda belum login. Silakan login kembali.");

      const res = await fetch(`${API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP error ${res.status}`);
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Respons server tidak valid");

      const mapped = data.data.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role as UserRole,
        status: "ACTIVE" as const,
        joinDate: u.created_at || new Date().toISOString(),
        phone: u.phone || "-",
        address: u.address || "-",
      }));

      setUsers(mapped);
      toast.success("Data pengguna berhasil dimuat");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || "Gagal memuat daftar pengguna");
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  // Load current user sekali saja
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setCurrentUser(JSON.parse(stored));
      } catch {
        console.warn("Data user di localStorage tidak valid");
      }
    }
  }, []);

  // Fetch pertama kali saat halaman dimuat (hanya jika Admin)
  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  // Drawer States
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>("Pelanggan");

  const openDetail = (user: User) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setSelectedRole(user.role);
    setIsEditOpen(true);
  };

  const handleChangeRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${API_BASE_URL}/user/${editingUser.id}/change-role`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Gagal mengubah role");

      toast.success(`Role ${editingUser.name} berhasil diubah menjadi ${selectedRole}`);
      setIsEditOpen(false);
      await fetchUsers(); // Refresh setelah ubah role
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan");
    }
  };

  // Filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = !filterRole || u.role === filterRole;
      const matchesStatus = !filterStatus || u.status === filterStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, filterRole, filterStatus]);

  return {
    currentUser,
    isAdmin,
    users: filteredUsers,
    loading,
    error,
    fetchUsers,
    isDetailOpen,
    setIsDetailOpen,
    isEditOpen,
    setIsEditOpen,
    selectedUser,
    editingUser,
    selectedRole,
    setSelectedRole,
    openDetail,
    openEdit,
    handleChangeRole,
    searchTerm,
    setSearchTerm,
    filterRole,
    setFilterRole,
    filterStatus,
    setFilterStatus,
  };
};