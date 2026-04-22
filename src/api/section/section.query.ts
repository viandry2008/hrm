import { useMutation, useQuery } from "@tanstack/react-query";

import {
    createSectionApi,
    deleteSectionApi,
    getSectionsApi,
    updateSectionApi,
    getSectionDetailApi,
} from "./section.api";

import { SectionPostRequest } from "./section.types";
import { showSuccessDialog, showErrorDialog } from "@/components/ui/confirm-dialog";

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

        onSuccess: async () => {
            showSuccessDialog({ title: "Bagian Berhasil Dibuat!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal membuat bagian" });
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

        onSuccess: async () => {
            showSuccessDialog({ title: "Bagian Berhasil Diperbarui!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal memperbarui bagian" });
        },
    });
};

/**
 * DELETE section
 */
export const useDeleteSection = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (id: number) => deleteSectionApi(id),

        onSuccess: async () => {
            showSuccessDialog({ title: "Bagian Berhasil Dihapus!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal menghapus bagian" });
        },
    });
};