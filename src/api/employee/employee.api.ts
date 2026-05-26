import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { EmployeeMessageResponse, EmployeeListResponse, EmployeeMultipleDeleteRequest, EmployeeSummaryResponse, EmployeeMultipleChangeRequest, EmployeeMultipleContractRequest, EmployeePostResponse, EmployeeDetailResponse, EmployeeImportResponse } from "./employee.types";

export const getEmployeesApi = async (
    params: { search?: string; limit?: number; page?: number; status?: string }
): Promise<EmployeeListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.EMPLOYEES, { params });
    return data;
};

export const getEmployeeApi = async (
    id: number | string
): Promise<EmployeeDetailResponse> => {
    const { data } = await apiClient.get(`${ENDPOINTS.EMPLOYEES}/${id}`);
    return data;
};

export const createEmployeeApi = async (
    payload: FormData
): Promise<EmployeePostResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.EMPLOYEES, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

export const updateEmployeeApi = async (
    id: number | string,
    payload: FormData
): Promise<EmployeePostResponse> => {
    const { data } = await apiClient.post(
        `${ENDPOINTS.EMPLOYEES}/${id}/update`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
    );
    return data;
};

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

export const exportEmployeesApi = async (): Promise<Blob> => {
    const response = await apiClient.get(ENDPOINTS.EMPLOYEES_EXPORT, {
        responseType: "blob",
    });
    return response.data;
};

export const templateEmployeesApi = async (): Promise<Blob> => {
    const response = await apiClient.get(ENDPOINTS.EMPLOYEES_TEMPLATE, {
        responseType: "blob",
    });
    return response.data;
};

export const importEmployeesApi = async (
    payload: FormData
): Promise<EmployeeImportResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.EMPLOYEES_IMPORT, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};
