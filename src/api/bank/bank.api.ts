import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import {
    BankListResponse,
    BankPostResponse,
    BankPostRequest,
    // BankDetailResponse,
    // ApiBaseResponse,
} from "./bank.types";

/**
 * GET list banks (search + pagination)
 */
export const getBanksApi = async (
    params: { search?: string; limit?: number; page?: number }
): Promise<BankListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.BANKS, { params });
    return data;
};

/**
 * CREATE bank
 */
export const createBankApi = async (
    payload: BankPostRequest
): Promise<BankPostResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.BANKS, payload);
    return data;
};

/**
 * GET detail bank
 */
// export const getBankDetailApi = async (
//     id: number
// ): Promise<BankDetailResponse> => {
//     const { data } = await apiClient.get(`${ENDPOINTS.BANKS}/${id}`);
//     return data;
// };

/**
 * UPDATE bank
 */
export const updateBankApi = async (
    id: number,
    payload: BankPostRequest
): Promise<BankPostResponse> => {
    const { data } = await apiClient.put(`${ENDPOINTS.BANKS}/${id}`, payload);
    return data;
};

/**
 * DELETE bank
 */
// export const deleteBankApi = async (
//     id: number
// ): Promise<ApiBaseResponse> => {
//     const { data } = await apiClient.delete(`${ENDPOINTS.BANKS}/${id}`);
//     return data;
// };
