import { useMutation, useQuery } from "@tanstack/react-query";
import { loginApi, getProfileApi, forgotPasswordApi, verifyOtpApi, resetPasswordApi, logoutApi } from "./auth.api";
import { useAuthStore } from "./auth.store";
import { ForgotRequest, LoginRequest, ResetPasswordRequest, VerifyOtpRequest } from "./auth.types";
import { useNavigate } from "react-router-dom";
import { SwalSuccess, SwalError } from "@/lib/swal.helper";

export const useLogin = () => {
    const setAuth = useAuthStore((s) => s.setAuth);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: LoginRequest) => loginApi(payload),

        onSuccess: async (data, variables) => {
            setAuth(data, variables.is_management);
            await SwalSuccess("Berhasil Masuk!", "Selamat Datang di SMART HRM");
            navigate("/dashboard", { replace: true });
        },

        onError: (err: any) => {
            SwalError("Login Gagal", err.response?.data?.message || "Gagal masuk ke akun");
        },
    });
};

export const useForgot = (setStep: (v: "email" | "verify" | "reset") => void) => {
    return useMutation({
        mutationFn: (payload: ForgotRequest) => forgotPasswordApi(payload),

        onSuccess: async () => {
            await SwalSuccess("Kode Terkirim!", "Kode verifikasi telah dikirim ke email Anda.");
            setStep("verify");
        },

        onError: (err: any) => {
            SwalError("Gagal", err.response?.data?.message || "Gagal mengirim email");
        },
    });
};

export const useVerify = (setStep: (v: "email" | "verify" | "reset") => void) => {
    return useMutation({
        mutationFn: (payload: VerifyOtpRequest) => verifyOtpApi(payload),

        onSuccess: async () => {
            await SwalSuccess("Verifikasi Berhasil!", "Silakan ubah kata sandi Anda.");
            setStep("reset");
        },

        onError: (err: any) => {
            SwalError("Gagal", err.response?.data?.message || "Gagal verifikasi");
        },
    });
};

export const useReset = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: ResetPasswordRequest) => resetPasswordApi(payload),

        onSuccess: async () => {
            await SwalSuccess("Kata sandi berhasil diubah!");
            navigate("/login");
        },

        onError: (err: any) => {
            SwalError("Gagal", err.response?.data?.message || "Gagal mengubah password");
        },
    });
};

export const useLogout = () => {
    const { logout: clearSession } = useAuthStore();

    return useMutation({
        mutationFn: logoutApi,

        onSuccess: async (res) => {
            await SwalSuccess("Berhasil Logout!", res.message || "Anda telah keluar dari sistem.");
            clearSession();
        },

        onError: (err: any) => {
            SwalError("Gagal", err.response?.data?.message || "Terjadi kesalahan logout");
        },
    });
};

export const useProfile = () => {
    const { token } = useAuthStore();

    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfileApi,
        enabled: !!token,
    });
};