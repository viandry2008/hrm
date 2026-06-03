import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { ShiftListResponse, AttendanceListResponse, AttendanceRecapListResponse, AttendanceRecapCreateRequest, AttendanceRecapCreateResponse, AttendanceRecapDeleteResponse } from "./attendance.types";

export const getShiftsApi = async (
    params: { search?: string; page?: number; limit?: number }
): Promise<ShiftListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.SHIFTS, { params });
    return data;
};

export const getAttendancesApi = async (
    params: { search?: string; shift?: number | null; start_date?: string; end_date?: string; page?: number; limit?: number }
): Promise<AttendanceListResponse> => {
    const cleanedParams: Record<string, any> = { ...params };

    if (cleanedParams.shift === undefined) {
        delete cleanedParams.shift; // "all" → tidak kirim shift sama sekali
    } else if (cleanedParams.shift === null) {
        cleanedParams.shift = 'null'; // non-shift → kirim sebagai string "null"
    }

    const { data } = await apiClient.get(ENDPOINTS.ATTENDANCES, { params: cleanedParams });
    return data;
};

export const getAttendanceRecapsApi = async (params: { category_id?: number; start_date?: string; end_date?: string; page?: number; limit?: number } = {}): Promise<AttendanceRecapListResponse> => {
    const cleanedParams: Record<string, any> = { ...params };
    Object.keys(cleanedParams).forEach((key) => cleanedParams[key] === undefined && delete cleanedParams[key]);

    const { data } = await apiClient.get<AttendanceRecapListResponse>(ENDPOINTS.ATTENDANCES_RECAPS, { params: cleanedParams });
    return data;
};

export const createAttendanceRecapApi = async (payload: AttendanceRecapCreateRequest): Promise<AttendanceRecapCreateResponse> => {
    const { data } = await apiClient.post<AttendanceRecapCreateResponse>(ENDPOINTS.ATTENDANCES_RECAPS, payload);
    return data;
};

export const downloadAttendanceRecapApi = async (id: number): Promise<void> => {
    const url = `${ENDPOINTS.ATTENDANCES_RECAPS}/${id}/download`;
    const response = await apiClient.get(url, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `recap_${id}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(link.href);
};

export const deleteAttendanceRecapApi = async (id: number): Promise<AttendanceRecapDeleteResponse> => {
    const { data } = await apiClient.delete<AttendanceRecapDeleteResponse>(`${ENDPOINTS.ATTENDANCES_RECAPS}/${id}`);
    return data;
};