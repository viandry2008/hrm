import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useForgot, useReset, useVerify } from "@/api/auth/auth.query";

export const ForgotPasswordPage = () => {
  const [step, setStep] = useState<"email" | "verify" | "reset">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const forgotMutation = useForgot(setStep);
  const verifyMutation = useVerify(setStep);
  const resetMutation = useReset();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      Swal.fire({
        title: "<span style='color:white'>Gagal</span>",
        text: "Email tidak boleh kosong!",
        icon: "error",
        background: "#d11a2a",
        color: "white",
        confirmButtonColor: "#ffffff",
      });
      return;
    }

    // ✅ Panggil API forgotPassword
    forgotMutation.mutate({ email });
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const otp = code.join("");
    if (otp.length < 6) {
      Swal.fire({
        title: "<span style='color:white'>Kode belum lengkap</span>",
        text: "Silakan isi semua 6 digit kode verifikasi.",
        icon: "warning",
        background: "#d11a2a",
        color: "white",
        confirmButtonColor: "#ffffff",
      });
      return;
    }

    // ✅ Kirim OTP ke backend
    verifyMutation.mutate({
      email,
      otp,
    });
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      Swal.fire("Gagal", "Kata sandi minimal 8 karakter", "error");
      return;
    }

    if (password !== confirm) {
      Swal.fire("Gagal", "Kata sandi tidak cocok", "error");
      return;
    }

    const otp = code.join("");
    // ✅ Kirim ke backend
    resetMutation.mutate({
      email,
      otp,
      password,
      password_confirmation: confirm,
    });
  };

  const handleCodeChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 sm:p-6">
      <div className="w-full max-w-full sm:max-w-5xl mx-auto">
        <div
          className="relative w-full min-h-[500px] md:min-h-[600px] rounded-2xl shadow-2xl overflow-hidden flex items-center"
          style={{
            backgroundImage: "url('/wave4.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative z-20 flex items-center justify-center w-full sm:w-1/2 p-6 sm:p-8"
          >
            <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
              {/* Judul berubah sesuai step */}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-black">
                  {step === "email"
                    ? "Reset Password"
                    : step === "verify"
                      ? "Verifikasi Kode"
                      : "Ubah Kata Sandi"}
                </CardTitle>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  {step === "email" &&
                    "Masukkan email Anda untuk mengatur ulang password"}
                  {step === "verify" &&
                    "Silakan masukkan kode verifikasi yang telah dikirim ke email Anda"}
                  {step === "reset" &&
                    "Masukkan kata sandi baru Anda untuk melanjutkan"}
                </p>
              </CardHeader>

              <CardContent>
                {step === "email" && (
                  <form onSubmit={handleEmailSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-gray-700 font-semibold text-sm sm:text-base"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@company.com"
                        className="h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={forgotMutation.isPending}
                      className={`w-full h-11 ${forgotMutation.isPending
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        } text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base`}
                    >
                      {forgotMutation.isPending ? "Mengirim..." : "Submit"}
                    </Button>
                  </form>
                )}

                {step === "verify" && (
                  <form onSubmit={handleVerifySubmit} className="space-y-5">
                    <div className="flex justify-center gap-3 mt-4">
                      {code.map((digit, i) => (
                        <Input
                          key={i}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleCodeChange(i, e.target.value)
                          }
                          className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 focus:border-blue-500 rounded-lg"
                        />
                      ))}
                    </div>
                    <Button
                      disabled={verifyMutation.isPending}
                      type="submit"
                      className={`w-full h-11 ${verifyMutation.isPending
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        } text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base`}
                    >
                      {verifyMutation.isPending ? "Loading..." : "Submit"}
                    </Button>
                  </form>
                )}

                {step === "reset" && (
                  <form onSubmit={handleResetSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="password">Kata Sandi Baru</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan kata sandi baru"
                        className="h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-gray-50 focus:bg-white"
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
                        className="h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Simpan
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="text-center mt-6 text-gray-600 text-xs sm:text-sm md:text-base">
          © 2025 PT Proven Force Indonesia. All rights reserved.
        </div>
      </div>
    </div>
  );
};
