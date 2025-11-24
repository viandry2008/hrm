import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { deleteEmployeeApi, deleteMultipleEmployeeApi, getEmployeesApi, getSummaryEmployeeApi, updateMultipleContractEmployeeApi, updateMultipleStatusEmployeeApi } from "./employee.api";
import { EmployeeMultipleChangeRequest, EmployeeMultipleContractRequest } from "./employee.types";

export const useGetEmployees = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["Employees", params],
        queryFn: () => getEmployeesApi(params),
    });
};

export const useDeleteEmployee = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (id: number) => deleteEmployeeApi(id),

        onSuccess: async (data) => {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Karyawan berhasil dihapus.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#3b82f6',
                color: '#ffffff',
                customClass: {
                    popup: 'bg-blue-500 text-white',
                },
            });

            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            Swal.fire("Gagal", err.response?.data?.message || "Gagal menghapus Employee", "error");
        },
    });
};

export const useGetEmployeeSummary = () => {
    return useQuery({
        queryKey: ["EmployeeSummary"],
        queryFn: () => getSummaryEmployeeApi(),
    });
};

export const useDeleteMultipleEmployee = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: { ids: number[] }) =>
            deleteMultipleEmployeeApi(payload),

        onSuccess: () => {
            Swal.fire({
                title: "Berhasil!",
                text: "Karyawan dipilih berhasil dihapus.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            Swal.fire(
                "Gagal",
                err.response?.data?.message || "Gagal menghapus karyawan",
                "error"
            );
        },
    });
};

export const useUpdateMultipleStatusEmployee = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: EmployeeMultipleChangeRequest) =>
            updateMultipleStatusEmployeeApi(payload),

        onSuccess: () => {
            Swal.fire({
                title: "Berhasil!",
                text: "Status karyawan berhasil diupdate.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            onSuccessReset?.();
        },

        onError: (err: any) => {
            Swal.fire(
                "Gagal",
                err.response?.data?.message || "Gagal update status.",
                "error"
            );
        },
    });
};

export const useUpdateMultipleContractEmployee = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: EmployeeMultipleContractRequest) =>
            updateMultipleContractEmployeeApi(payload),

        onSuccess: () => {
            Swal.fire({
                title: "Berhasil!",
                text: "Kontrak karyawan berhasil diperbarui.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            onSuccessReset?.();
        },

        onError: (err: any) => {
            Swal.fire(
                "Gagal",
                err.response?.data?.message || "Gagal update kontrak.",
                "error"
            );
        },
    });
};

