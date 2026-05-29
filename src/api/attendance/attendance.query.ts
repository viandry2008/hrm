import { useQuery } from "@tanstack/react-query";
import { getShiftsApi, getAttendancesApi } from "./attendance.api";
import { ShiftListResponse, AttendanceListResponse } from "./attendance.types";

export const useGetShifts = (params: { search?: string; page?: number; limit?: number } = {}) => {
    return useQuery<ShiftListResponse>({
        queryKey: ["Shifts", params],
        queryFn: () => getShiftsApi(params),
    });
};

export const useGetAttendances = (params: { search?: string; shift?: number | null; start_date?: string; end_date?: string; page?: number; limit?: number } = {}) => {
    return useQuery<AttendanceListResponse>({
        queryKey: ["Attendances", params],
        queryFn: () => getAttendancesApi(params),
    });
};
