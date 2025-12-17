import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import {
    createSectionApi,
    deleteSectionApi,
    getSectionsApi,
    updateSectionApi,
    getSectionDetailApi,
} from "./section.api";

import { SectionPostRequest } from "./section.types";

/**
 * GET list sections
 */
export const useGetSections = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["Sections", params],
        queryFn: () => getSectionsApi(params),
    });
};

/**
 * GET section detail
 */
export const useGetSectionDetail = (id: number) => {
    return useQuery({
        queryKey: ["SectionDetail", id],
        queryFn: () => getSectionDetailApi(id),
        enabled: !!id,
    });
};

/**
 * CREATE section
 */
export const useCreateSection = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: SectionPostRequest) =>
            createSectionApi(payload),

        onSuccess: async (data) => {
            Swal.fire({
                icon: "success",
                title: '<span style="color: white;">Section Created!</span>',
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
            Swal.fire(
                "Gagal",
                err.response?.data?.message || "Gagal membuat Section",
                "error"
            );
        },
    });
};

/**
 * UPDATE section
 */
export const useUpdateSection = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number;
            payload: SectionPostRequest;
        }) => updateSectionApi(id, payload),

        onSuccess: async (data) => {
            Swal.fire({
                icon: "success",
                title: '<span style="color: white;">Section Updated!</span>',
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
            Swal.fire(
                "Gagal",
                err.response?.data?.message || "Gagal update Section",
                "error"
            );
        },
    });
};

/**
 * DELETE section
 */
export const useDeleteSection = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (id: number) => deleteSectionApi(id),

        onSuccess: async (data) => {
            Swal.fire({
                icon: "success",
                title: '<span style="color: white;">Section Deleted!</span>',
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
            Swal.fire(
                "Gagal",
                err.response?.data?.message || "Gagal menghapus Section",
                "error"
            );
        },
    });
};
