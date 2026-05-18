import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { CompanyDeleteResponse, CompanyListResponse, CompanyPostRequest, CompanyPostResponse, } from "./company.types";

export const getCompanysApi = async (
    params: { search?: string; limit?: number; page?: number }
): Promise<CompanyListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.COMPANIES, { params });
    return data;
};

export const createCompanyApi = async (
    payload: CompanyPostRequest
): Promise<CompanyPostResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.COMPANIES, payload);
    return data;
};

export const updateCompanyApi = async (
    id: number,
    payload: CompanyPostRequest
): Promise<CompanyPostResponse> => {
    const { data } = await apiClient.put(`${ENDPOINTS.COMPANIES}/${id}`, payload);
    return data;
};

export const deleteCompanyApi = async (
    id: number
): Promise<CompanyDeleteResponse> => {
    const { data } = await apiClient.delete(`${ENDPOINTS.COMPANIES}/${id}`);
    return data;
};

