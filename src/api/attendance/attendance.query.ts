import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getShiftsApi, getAttendancesApi, getAttendanceRequestsApi, getAttendanceRecapsApi, createAttendanceRecapApi, downloadAttendanceRecapApi, deleteAttendanceRecapApi } from "./attendance.api";
import { ShiftListResponse, AttendanceListResponse, AttendanceRequestListResponse, AttendanceRecapListResponse, AttendanceRecapCreateRequest } from "./attendance.types";
import Swal from "sweetalert2";

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

export const useGetAttendanceRequests = (params: { search?: string; page?: number; limit?: number } = {}) => {
    return useQuery<AttendanceRequestListResponse>({
        queryKey: ["AttendanceRequests", params],
        queryFn: () => getAttendanceRequestsApi(params),
    });
};

export const useGetAttendanceRecaps = (params: { category_id?: number; start_date?: string; end_date?: string; page?: number; limit?: number } = {}) => {
    return useQuery<AttendanceRecapListResponse>({
        queryKey: ["AttendanceRecaps", params],
        queryFn: () => getAttendanceRecapsApi(params),
    });
};

export const useCreateAttendanceRecap = (onSuccessReset?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: AttendanceRecapCreateRequest) => createAttendanceRecapApi(payload),

        onSuccess: async (response: any) => {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Rekap kehadiran berhasil dibuat.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
            });

            await queryClient.invalidateQueries({ queryKey: ["AttendanceRecaps"] });
            onSuccessReset?.();
        },

        onError: (err: any) => {
            console.error("Create recap error:", err);
            const errorMessage = err.response?.data?.message || err.message || "Gagal membuat rekap kehadiran";
            Swal.fire("Gagal", errorMessage, "error");
            onSuccessReset?.();
        },
    });
};

export const useDownloadAttendanceRecap = () => {
    return useMutation({
        mutationFn: (id: number) => downloadAttendanceRecapApi(id),

        onError: (err: any) => {
            console.error("Download recap error:", err);
            const errorMessage = err.response?.data?.message || err.message || "Gagal mengunduh rekap kehadiran";
            Swal.fire("Gagal", errorMessage, "error");
        },
    });
};

export const useDeleteAttendanceRecap = (onSuccessReset?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteAttendanceRecapApi(id),

        onSuccess: async (response: any) => {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Rekap kehadiran berhasil dihapus.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
            });

            await queryClient.invalidateQueries({ queryKey: ["AttendanceRecaps"] });
            onSuccessReset?.();
        },

        onError: (err: any) => {
            console.error("Delete recap error:", err);
            const errorMessage = err.response?.data?.message || err.message || "Gagal menghapus rekap kehadiran";
            Swal.fire("Gagal", errorMessage, "error");
        },
    });
};
