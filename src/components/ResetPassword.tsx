import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Swal from "sweetalert2";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      Swal.fire({
        title: "<span style='color:white'>Kata sandi terlalu pendek</span>",
        text: "Minimal 8 karakter kombinasi huruf besar, kecil, dan angka",
        icon: "warning",
        background: "#d11a2a",
        color: "white",
        confirmButtonColor: "#ffffff",
      });
      return;
    }

    if (password !== confirm) {
      Swal.fire({
        title: "<span style='color:white'>Kata sandi tidak cocok</span>",
        text: "Pastikan kedua kolom kata sandi sama.",
        icon: "error",
        background: "#d11a2a",
        color: "white",
        confirmButtonColor: "#ffffff",
      });
      return;
    }

    // 🔧 Ganti dengan API reset password nanti
    Swal.fire({
      title: "<span style='color:white'>Kata sandi berhasil diubah!</span>",
      icon: "success",
      background: "#0F2A4D",
      color: "white",
      confirmButtonColor: "#ffffff",
      confirmButtonText:
        "<span style='color:#0F2A4D;font-weight:bold;'>OK</span>",
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-2xl border border-gray-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-600">
              Ubah Kata Sandi
            </CardTitle>
            <CardDescription className="text-gray-600">
              Minimal 8 karakter kombinasi huruf besar, huruf kecil, dan angka
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Kata Sandi Baru</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi baru"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Ulangi Kata Sandi Baru</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg h-11 transition-all duration-200"
              >
                Simpan
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
