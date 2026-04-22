import { useMutation, useQuery } from "@tanstack/react-query";
import { createDepartmentApi, deleteDepartmentApi, getDepartmentsApi, updateDepartmentApi } from "./division.api";
import { DepartmentPostRequest } from "./division.types";
import { showSuccessDialog, showErrorDialog } from "@/components/ui/confirm-dialog";

export const useGetDepartments = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["departments", params],
        queryFn: () => getDepartmentsApi(params),
    });
};

export const useCreateDepartment = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: DepartmentPostRequest) =>
            createDepartmentApi(payload),

        onSuccess: async () => {
            showSuccessDialog({ title: "Divisi Berhasil Dibuat!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal membuat divisi" });
        },
    });
};

export const useUpdateDepartment = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: DepartmentPostRequest }) =>
            updateDepartmentApi(id, payload),

        onSuccess: async () => {
            showSuccessDialog({ title: "Divisi Berhasil Diperbarui!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal memperbarui divisi" });
        },
    });
};

export const useDeleteDepartment = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (id: number) => deleteDepartmentApi(id),

        onSuccess: async () => {
            showSuccessDialog({ title: "Divisi Berhasil Dihapus!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal menghapus divisi" });
        },
    });
};