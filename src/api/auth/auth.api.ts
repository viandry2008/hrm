import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { LoginResponse, LoginRequest, ForgotResponse, ForgotRequest, VerifyOtpRequest, ResetPasswordRequest, responOnlyMessage } from "./auth.types";

export const loginApi = async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.LOGIN, payload);
    return data;
};

export const forgotPasswordApi = async (payload: ForgotRequest): Promise<ForgotResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.FORGOT_PASSWORD, payload);
    return data;
};

export const verifyOtpApi = async (payload: VerifyOtpRequest): Promise<responOnlyMessage> => {
    const { data } = await apiClient.post(ENDPOINTS.VERIFY_OTP, payload);
    return data;
};

export const resetPasswordApi = async (payload: ResetPasswordRequest): Promise<responOnlyMessage> => {
    const { data } = await apiClient.post(ENDPOINTS.RESET_PASSWORD, payload);
    return data;
};

export const getProfileApi = async () => {
    const { data } = await apiClient.get(ENDPOINTS.USER_PROFILE);
    return data;
};

export const logoutApi = async (): Promise<responOnlyMessage> => {
    const { data } = await apiClient.post(ENDPOINTS.LOGOUT);
    return data;
};