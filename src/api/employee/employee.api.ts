import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { EmployeeDeleteResponse, EmployeeListResponse } from "./employee.types";

export const getEmployeesApi = async (
    params: { search?: string; limit?: number; page?: number }
): Promise<EmployeeListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.EMPLOYEES, { params });
    return data;
};

// export const createEmployeeApi = async (
//     payload: EmployeePostRequest
// ): Promise<EmployeePostResponse> => {
//     const { data } = await apiClient.post(ENDPOINTS.EMPLOYEES, payload);
//     return data;
// };

// export const updateEmployeeApi = async (
//     id: number,
//     payload: EmployeePostRequest
// ): Promise<EmployeePostResponse> => {
//     const { data } = await apiClient.put(`${ENDPOINTS.EMPLOYEES}/${id}`, payload);
//     return data;
// };

export const deleteEmployeeApi = async (
    id: number
): Promise<EmployeeDeleteResponse> => {
    const { data } = await apiClient.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
    return data;
};

