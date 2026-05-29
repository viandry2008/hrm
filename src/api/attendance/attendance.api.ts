import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { ShiftListResponse, AttendanceListResponse } from "./attendance.types";

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