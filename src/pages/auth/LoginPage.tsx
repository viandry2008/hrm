import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock, Eye, EyeOff, Briefcase, UserCircle, LogIn, } from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useLogin } from "@/api/auth/auth.query";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"management" | "employee">("management");

  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      Swal.fire({
        title: '<span style="color: white">Login Gagal</span>',
        text: "Username dan password harus diisi!",
        icon: "error",
        background: "#d11a2a",
        color: "white",
      });
      return;
    }

    try {
      const res = await loginMutation.mutateAsync({ username, password });

      await Swal.fire({
        title: '<span style="color: white">Berhasil Masuk!</span>',
        text: "Selamat Datang di SMART HRM",
        icon: "success",
        background: "#2794eb",
        color: "white",
        confirmButtonColor: "#ffffff",
        confirmButtonText:
          '<span style="color: #2794eb; font-weight: bold;">OK</span>',
        customClass: {
          popup: "rounded-xl",
          title: "text-xl",
          confirmButton: "text-sm px-6 py-2 rounded-lg",
        },
      });

      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      Swal.fire(
        "Gagal",
        err?.response?.data?.message || "Login gagal",
        "error"
      );
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
          <div className="relative z-20 flex items-center justify-center sm:justify-start w-full sm:w-1/2 p-4 sm:p-8 sm:pl-12">
            <Card className="w-full max-w-full sm:max-w-md bg-white rounded-2xl shadow-2xl p-4 sm:p-8">
              <CardHeader className="space-y-1 text-center pb-4 sm:pb-6">
                <div className="flex items-center justify-center space-x-2">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
                    SMART HRM
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-600 text-sm sm:text-base md:text-lg font-medium whitespace-nowrap">
                  Human Resource Information System
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5 md:space-y-6"
                >
                  {/* Role Switcher */}
                  <div className="flex justify-center mb-4 sm:mb-5">
                    <div className="inline-flex bg-gray-100 p-1 sm:p-2 rounded-full border border-gray-300 shadow-inner text-xs sm:text-sm md:text-base">
                      <button
                        type="button"
                        onClick={() => setRole("management")}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 font-medium rounded-full flex items-center gap-1 transition ${role === "management"
                          ? "bg-[#2794eb] text-white shadow"
                          : "text-gray-500 hover:text-blue-600"
                          }`}
                      >
                        <Briefcase
                          className={`w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 ${role === "management"
                            ? "text-white"
                            : "text-gray-500"
                            }`}
                        />
                        Manajemen
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole("employee")}
                        className={`px-2 sm:px-3 py-1 sm:py-1.5 font-medium rounded-full flex items-center gap-1 transition ${role === "employee"
                          ? "bg-[#2794eb] text-white shadow"
                          : "text-gray-500 hover:text-blue-600"
                          }`}
                      >
                        <UserCircle
                          className={`w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 ${role === "employee"
                            ? "text-white"
                            : "text-gray-500"
                            }`}
                        />
                        Karyawan
                      </button>
                    </div>
                  </div>

                  {/* Transisi form */}
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    {/* Username */}
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="text-gray-500 w-4 sm:w-5 h-4 sm:h-5" />
                        <Label
                          htmlFor="username"
                          className="text-gray-700 font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wide"
                        >
                          Username
                        </Label>
                      </div>
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-10 sm:h-11 md:h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-gray-50 focus:bg-white"
                        placeholder="Masukkan username"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <Lock className="text-gray-500 w-4 sm:w-5 h-4 sm:h-5" />
                        <Label
                          htmlFor="password"
                          className="text-gray-700 font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wide"
                        >
                          Password
                        </Label>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-10 sm:h-11 md:h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg bg-gray-50 focus:bg-white pr-10"
                          placeholder="Masukkan password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                          ) : (
                            <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember + Forgot password */}
                    <div className="flex flex-row items-center gap-x-4 text-xs sm:text-sm md:text-base w-full">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) =>
                            setRememberMe(!!checked)
                          }
                          className="border-2 border-gray-300"
                        />
                        <Label
                          htmlFor="remember"
                          className="text-gray-600 font-medium"
                        >
                          Ingat saya
                        </Label>
                      </div>
                      <a
                        onClick={() => navigate("/forgot-password")}
                        className="text-blue-600 hover:text-blue-800 font-medium ml-auto cursor-pointer"
                      >
                        Lupa password?
                      </a>
                    </div>
                  </motion.div>

                  {/* Tombol Masuk */}
                  <Button
                    type="submit"
                    className="w-full h-10 sm:h-11 md:h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base md:text-base"
                  >
                    <LogIn className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 mr-2" />
                    Masuk
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 sm:mt-6 text-gray-600 text-xs sm:text-sm md:text-base">
          © 2025 PT Proven Force Indonesia. All rights reserved.
        </div>
      </div>
    </div>
  );
};