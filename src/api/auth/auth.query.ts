import { useMutation, useQuery } from "@tanstack/react-query";
import { loginApi, getProfileApi, forgotPasswordApi, verifyOtpApi, resetPasswordApi, logoutApi } from "./auth.api";
import { useAuthStore } from "./auth.store";
import { ForgotRequest, LoginRequest, ResetPasswordRequest, VerifyOtpRequest } from "./auth.types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const setAuth = useAuthStore((s) => s.setAuth);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: LoginRequest) => loginApi(payload),
        onSuccess: async (data) => {
            console.log("Login successful:", data);

            // Simpan token & user ke zustand (otomatis tersimpan ke localStorage)
            setAuth(data);

            // Tampilkan notifikasi
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

            // ✅ Pastikan navigate baru dijalankan setelah token tersimpan
            navigate("/dashboard", { replace: true });
        },
        onError: (err: any) => {
            Swal.fire("Gagal", err.response?.data?.message || "Login gagal", "error");
        },
    });
};

export const useForgot = (setStep: (v: "email" | "verify" | "reset") => void) => {
    return useMutation({
        mutationFn: (payload: ForgotRequest) => forgotPasswordApi(payload),
        onSuccess: async (data) => {
            await Swal.fire({
                title: '<span style="color: white">Kode Terkirim!</span>',
                text: "Kode verifikasi telah dikirim ke email Anda.",
                icon: "success",
                background: "#2794eb",
                color: "white",
                confirmButtonColor: "#ffffff",
                confirmButtonText:
                    '<span style="color:#2794eb;font-weight:bold;">OK</span>',
                customClass: {
                    popup: "rounded-xl",
                    title: "text-xl",
                    confirmButton: "text-sm px-6 py-2 rounded-lg",
                },
            });

            // ✅ Pindah ke langkah verifikasi
            setStep("verify");
        },
        onError: (err: any) => {
            Swal.fire("Gagal", err.response?.data?.message || "Gagal mengirim email", "error");
        },
    });
};

export const useVerify = (setStep: (v: "email" | "verify" | "reset") => void) => {
    return useMutation({
        mutationFn: (payload: VerifyOtpRequest) => verifyOtpApi(payload),
        onSuccess: async (data) => {
            Swal.fire({
                title: "<span style='color:white'>Verifikasi Berhasil!</span>",
                text: "Silakan ubah kata sandi Anda.",
                icon: "success",
                background: "#2794eb",
                color: "white",
                confirmButtonColor: "#ffffff",
                confirmButtonText:
                    "<span style='color:#2794eb;font-weight:bold;'>OK</span>",
            }).then(() => setStep("reset"));
        },
        onError: (err: any) => {
            Swal.fire("Gagal", err.response?.data?.message || "Gagal verifikasi", "error");
        },
    });
};

export const useReset = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: ResetPasswordRequest) => resetPasswordApi(payload),
        onSuccess: async () => {
            await Swal.fire({
                title: "<span style='color:white'>Kata sandi berhasil diubah!</span>",
                icon: "success",
                background: "#2794eb",
                color: "white",
                confirmButtonColor: "#ffffff",
                confirmButtonText:
                    "<span style='color:#2794eb;font-weight:bold;'>OK</span>",
            });
            navigate("/login");
        },
        onError: (err: any) => {
            Swal.fire("Gagal", err.response?.data?.message || "Gagal mengubah password", "error");
        },
    });
};

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfileApi,
    });
};

export const useLogout = () => {
    const { logout: clearSession } = useAuthStore();

    return useMutation({
        mutationFn: logoutApi,
        onSuccess: (res) => {
            Swal.fire({
                icon: "success",
                title: "Berhasil Logout",
                text: res.message || "Anda telah keluar dari sistem.",
                confirmButtonColor: "#2794eb",
            });
            clearSession();
        },
        onError: (err: any) => {
            Swal.fire("Gagal", err.response?.data?.message || "Terjadi kesalahan logout", "error");
        },
    });
};