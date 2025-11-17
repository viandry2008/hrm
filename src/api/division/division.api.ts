import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { DepartmentDeleteResponse, DepartmentListResponse, DepartmentPostRequest, DepartmentPostResponse } from "./division.types";

export const getDepartmentsApi = async (
    params: { search?: string; limit?: number; page?: number }
): Promise<DepartmentListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.DEPARTMENTS, { params });
    return data;
};

export const createDepartmentApi = async (
    payload: DepartmentPostRequest
): Promise<DepartmentPostResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.DEPARTMENTS, payload);
    return data;
};

export const updateDepartmentApi = async (
    id: number,
    payload: DepartmentPostRequest
): Promise<DepartmentPostResponse> => {
    const { data } = await apiClient.put(`${ENDPOINTS.DEPARTMENTS}/${id}`, payload);
    return data;
};

export const deleteDepartmentApi = async (
    id: number
): Promise<DepartmentDeleteResponse> => {
    const { data } = await apiClient.delete(`${ENDPOINTS.DEPARTMENTS}/${id}`);
    return data;
};

