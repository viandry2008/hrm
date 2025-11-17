import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { createDepartmentApi, deleteDepartmentApi, getDepartmentsApi, updateDepartmentApi } from "./division.api";
import { DepartmentPostRequest } from "./division.types";

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

        onSuccess: async (data) => {
            Swal.fire({
                icon: "success",
                title: '<span style="color: white;">Department Created!</span>',
                text: data.message,
                background: "#1166d8",
                color: "white",
                confirmButtonColor: "#ffffff",
                confirmButtonText:
                    '<span style="color: #1166d8; font-weight: bold;">OK</span>',
                customClass: {
                    popup: "rounded-xl",
                    title: "text-xl",
                    confirmButton: "text-sm px-6 py-2 rounded-lg",
                },
            });

            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            Swal.fire("Gagal", err.response?.data?.message || "Gagal membuat department", "error");
        },
    });
};

export const useUpdateDepartment = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: DepartmentPostRequest }) =>
            updateDepartmentApi(id, payload),

        onSuccess: async (data) => {
            Swal.fire({
                icon: "success",
                title: '<span style="color: white;">Department Updated!</span>',
                text: data.message,
                background: "#1166d8",
                color: "white",
                confirmButtonColor: "#ffffff",
                confirmButtonText:
                    '<span style="color: #1166d8; font-weight: bold;">OK</span>',
                customClass: {
                    popup: "rounded-xl",
                    title: "text-xl",
                    confirmButton: "text-sm px-6 py-2 rounded-lg",
                },
            });

            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            Swal.fire("Gagal", err.response?.data?.message || "Gagal update department", "error");
        },
    });
};

export const useDeleteDepartment = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (id: number) => deleteDepartmentApi(id),

        onSuccess: async (data) => {
            Swal.fire({
                icon: "success",
                title: '<span style="color: white;">Department Deleted!</span>',
                text: data.message,
                background: "#1166d8",
                color: "white",
                confirmButtonColor: "#ffffff",
                confirmButtonText:
                    '<span style="color: #1166d8; font-weight: bold;">OK</span>',
                customClass: {
                    popup: "rounded-xl",
                    title: "text-xl",
                    confirmButton: "text-sm px-6 py-2 rounded-lg",
                },
            });

            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            Swal.fire("Gagal", err.response?.data?.message || "Gagal menghapus department", "error");
        },
    });
};