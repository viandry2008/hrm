import { useMutation, useQuery } from "@tanstack/react-query";

import {
    createCategoryApi,
    // deleteCategoryApi,
    getCategoriesApi,
    updateCategoryApi,
    // getCategoryDetailApi,
} from "./category.api";

import { CategoryPostRequest } from "./category.types";
import { showSuccessDialog, showErrorDialog } from "@/components/ui/confirm-dialog";

/**
 * GET list categories
 */
export const useGetCategories = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["Categories", params],
        queryFn: () => getCategoriesApi(params),
    });
};

/**
 * GET category detail
 */
// export const useGetCategoryDetail = (id: number) => {
//     return useQuery({
//         queryKey: ["CategoryDetail", id],
//         queryFn: () => getCategoryDetailApi(id),
//         enabled: !!id,
//     });
// };

/**
 * CREATE category
 */
export const useCreateCategory = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: CategoryPostRequest) =>
            createCategoryApi(payload),

        onSuccess: async () => {
            showSuccessDialog({ title: "Kategori Berhasil Dibuat!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal membuat kategori" });
        },
    });
};

/**
 * UPDATE category
 */
export const useUpdateCategory = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number;
            payload: CategoryPostRequest;
        }) => updateCategoryApi(id, payload),

        onSuccess: async () => {
            showSuccessDialog({ title: "Kategori Berhasil Diperbarui!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal memperbarui kategori" });
        },
    });
};

/**
 * DELETE category
 */
// export const useDeleteCategory = (onSuccessReset?: () => void) => {
//     return useMutation({
//         mutationFn: (id: number) => deleteCategoryApi(id),

//         onSuccess: async () => {
//             showSuccessDialog({ title: "Kategori Berhasil Dihapus!" });
//             if (onSuccessReset) onSuccessReset();
//         },

//         onError: (err: any) => {
//             showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal menghapus kategori" });
//         },
//     });
// };
