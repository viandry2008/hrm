import axios from "axios";
import { useAuthStore } from "@/api/auth/auth.store";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// 🔥 Auto logout ketika 401
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;

        if (status === 401) {
            const logout = useAuthStore.getState().logout;
            logout();

            // optional: notification
            // alert("Session expired, please login again.");

            // Redirect manual untuk menghindari blank screen
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default apiClient;
