import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email dan kata sandi wajib diisi");
      setLoading(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 detik timeout

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login gagal");
      }

      // Simpan token & user info
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(`Selamat datang kembali, ${data.user.name || data.user.email}!`);

      // Redirect ke halaman utama / dashboard
      navigate("/manajemen-inventaris", { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);

      if (err.name === "AbortError") {
        setErrorMessage("Permintaan timeout. Silakan coba lagi.");
      } else if (err.message.includes("Failed to fetch")) {
        setErrorMessage("Tidak dapat terhubung ke server. Periksa koneksi atau backend.");
      } else {
        setErrorMessage(err.message || "Email atau kata sandi salah");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="relative top-[-10px]">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Masuk
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masukkan email dan kata sandi untuk mengakses
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>
                Akun Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                placeholder="contoh: admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                autoFocus
              />
            </div>

            <div>
              <Label>
                Kata Sandi <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  disabled={loading}
                >
                  {showPassword ? (
                    <Eye className="text-black size-5" />
                  ) : (
                    <EyeClosed className="text-black size-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sedang masuk..." : "Masuk"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}