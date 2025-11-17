import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { createPositionApi, deletePositionApi, getPositionsApi, updatePositionApi } from "./position.api";
import { PositionPostRequest } from "./position.types";

export const useGetPositions = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["Positions", params],
        queryFn: () => getPositionsApi(params),
    });
};

export const useCreatePosition = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: PositionPostRequest) =>
            createPositionApi(payload),

        onSuccess: async (data) => {
            Swal.fire({
                icon: "success",
                title: '<span style="color: white;">Position Created!</span>',
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
            Swal.fire("Gagal", err.response?.data?.message || "Gagal membuat Position", "error");
        },
    });
};

export const useUpdatePosition = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: PositionPostRequest }) =>
            updatePositionApi(id, payload),

        onSuccess: async (data) => {
            Swal.fire({
                icon: "success",
                title: '<span style="color: white;">Position Updated!</span>',
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
            Swal.fire("Gagal", err.response?.data?.message || "Gagal update Position", "error");
        },
    });
};

export const useDeletePosition = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (id: number) => deletePositionApi(id),

        onSuccess: async (data) => {
            Swal.fire({
                icon: "success",
                title: '<span style="color: white;">Position Deleted!</span>',
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
            Swal.fire("Gagal", err.response?.data?.message || "Gagal menghapus Position", "error");
        },
    });
};