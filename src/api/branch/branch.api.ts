import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { BranchDeleteResponse, BranchListResponse, BranchPostRequest, BranchPostResponse, } from "./branch.types";

export const getBranchesApi = async (
    params: { search?: string; limit?: number; page?: number }
): Promise<BranchListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.BRANCHES, { params });
    return data;
};

export const createBranchApi = async (
    payload: BranchPostRequest
): Promise<BranchPostResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.BRANCHES, payload);
    return data;
};

export const updateBranchApi = async (
    id: number,
    payload: BranchPostRequest
): Promise<BranchPostResponse> => {
    const { data } = await apiClient.put(`${ENDPOINTS.BRANCHES}/${id}`, payload);
    return data;
};

export const deleteBranchApi = async (
    id: number
): Promise<BranchDeleteResponse> => {
    const { data } = await apiClient.delete(`${ENDPOINTS.BRANCHES}/${id}`);
    return data;
};

