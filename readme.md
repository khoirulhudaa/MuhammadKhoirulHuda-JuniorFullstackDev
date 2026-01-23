# Fullstack - Inventory Management System.

Aplikasi manajemen inventaris barang dengan sistem **Role-Based Access Control (RBAC)**. Dibangun menggunakan React.js untuk Frontend dan Express.js dengan Sequelize ORM untuk Backend.

## 🛠️ Stack Teknologi
* **Frontend:** React.js
* **Backend:** Node.js, Express.js, Sequelize ORM
* **Database:** MySQL (Laragon)
* **Auth:** JSON Web Token (JWT)

---

## 🏗️ Struktur Database (Relational)

Aplikasi menggunakan Sequelize untuk mengelola relasi antar tabel berikut:

1.  **Tabel `Roles`**: Menyimpan level akses (`Admin`, `Seller`, `Pelanggan`).
2.  **Tabel `Users`**: Menyimpan data pengguna. Memiliki `role_id` sebagai **Foreign Key** ke tabel `Roles`.
3.  **Tabel `Products`**: Menyimpan data barang (`name`, `stock`, `price`, `created_at`).



---

## 🔐 Role-Based Access Control (RBAC)

| Fitur | Admin | Seller | Pelanggan |
| :--- | :---: | :---: | :---: |
| Lihat Produk | ✅ | ✅ | ✅ |
| Tambah Produk | ✅ | ❌ | ❌ |
| Transaksi Jual (Potong Stok) | ✅ | ✅ | ❌ |
| Kelola User & Role | ✅ | ❌ | ❌ |

---

## 🚀 Panduan Instalasi Lokal

### 1. Setup Database (Laragon/MySQL)
1.  Buka **Laragon** dan klik **Start All**.
2.  Buat database baru melalui HeidiSQL/phpMyAdmin dengan nama: `api_ecommerce`.
3.  Pastikan konfigurasi database di backend sudah sesuai (lihat bagian `.env`).

### 2. Setup Backend (Express + Sequelize)
1.  Masuk ke folder backend: `cd backend`
2.  Install dependensi: `npm install`
3.  Buat file `.env` di root folder backend dan isi sebagai berikut:
    ```env
    PORT=5050
    DB_HOST=127.0.0.1
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=api_ecommerce
    JWT_SECRET=APIECOMMERCEUNIQUE123_
    JWT_EXPIRES_IN=1d
    ```
4.  Jalankan migrasi/sinkronisasi database:
    * *Jika Anda menggunakan `sequelize.sync()`, cukup jalankan aplikasi.*
5.  Running server: `nodemon main.js` atau `node main.js`.

### 3. Setup Frontend (React)
1.  Masuk ke folder frontend: `cd frontend`
2.  Install dependensi: `npm install`
3.  Jalankan aplikasi: `npm start`
4.  Akses di browser: `http://localhost:5173`

---

## 📋 Fitur & Endpoint API

### 🛡️ Authentication (Middleware Protected)
* `POST /auth/login`: Autentikasi user & pemberian Token JWT.
* `POST /auth/logout`: Menghapus sesi/token.
* `GET /auth/me`: Mengambil profil user aktif berdasarkan token.

### 📦 Modul Produk
* `GET /products`: Daftar barang (Semua User).
* `POST /products`: Tambah barang baru (Admin Only).
* `POST /products/:id/sell`: Transaksi penjualan.
    * **Logika Bisnis:** Stok akan berkurang otomatis. Jika stok < jumlah jual, transaksi (disabled).

### 👥 Modul User (RBAC Management)
* `GET /users`: List semua user (Admin Only).
* `PUT /users/:id/change-role`: Mengubah role user ke Admin/Seller/Pelanggan (Admin Only).

---

## 💡 Validasi Frontend
* Sistem menampilkan **Toast/Alert** jika stok tidak mencukupi saat klik tombol "Jual".
* Tombol "Input Barang" dan Menu "Manajemen User" disembunyikan secara otomatis jika login bukan sebagai Admin.
