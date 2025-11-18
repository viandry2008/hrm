import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/api/auth/auth.store";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Tambahkan token dari localStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Interceptor untuk token expired
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            const logout = useAuthStore.getState().logout;

            // Hapus session user
            logout();

            // Redirect ke login
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
