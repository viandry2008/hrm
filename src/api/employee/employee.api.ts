import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { EmployeeMessageResponse, EmployeeListResponse, EmployeeMultipleDeleteRequest, EmployeeSummaryResponse, EmployeeMultipleChangeRequest, EmployeeMultipleContractRequest } from "./employee.types";

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
): Promise<EmployeeMessageResponse> => {
    const { data } = await apiClient.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
    return data;
};

export const getSummaryEmployeeApi = async (
): Promise<EmployeeSummaryResponse> => {
    const { data } = await apiClient.get(`${ENDPOINTS.EMPLOYEES_SUMMARY}`);
    return data;
};

export const deleteMultipleEmployeeApi = async (
    payload: EmployeeMultipleDeleteRequest
): Promise<EmployeeMessageResponse> => {
    const { data } = await apiClient.post(`${ENDPOINTS.MULTIPLE_DELETE_EMPLOYEE}`, payload);
    return data;
};

export const updateMultipleStatusEmployeeApi = async (
    payload: EmployeeMultipleChangeRequest
): Promise<EmployeeMessageResponse> => {
    const { data } = await apiClient.post(`${ENDPOINTS.MULTIPLE_STATUS_EMPLOYEE}`, payload);
    return data;
};

export const updateMultipleContractEmployeeApi = async (
    payload: EmployeeMultipleContractRequest
): Promise<EmployeeMessageResponse> => {
    const { data } = await apiClient.post(`${ENDPOINTS.MULTIPLE_CONTRACT_EMPLOYEE}`, payload);
    return data;
};

