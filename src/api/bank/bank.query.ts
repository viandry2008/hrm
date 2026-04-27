import { useMutation, useQuery } from "@tanstack/react-query";

import {
    createBankApi,
    // deleteBankApi,
    getBanksApi,
    updateBankApi,
    // getBankDetailApi,
} from "./bank.api";

import { BankPostRequest } from "./bank.types";
import { showSuccessDialog, showErrorDialog } from "@/components/ui/confirm-dialog";

/**
 * GET list banks
 */
export const useGetBanks = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["Banks", params],
        queryFn: () => getBanksApi(params),
    });
};

/**
 * GET bank detail
 */
// export const useGetBankDetail = (id: number) => {
//     return useQuery({
//         queryKey: ["BankDetail", id],
//         queryFn: () => getBankDetailApi(id),
//         enabled: !!id,
//     });
// };

/**
 * CREATE bank
 */
export const useCreateBank = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: BankPostRequest) =>
            createBankApi(payload),

        onSuccess: async () => {
            showSuccessDialog({ title: "Bank Berhasil Dibuat!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal membuat bank" });
        },
    });
};

/**
 * UPDATE bank
 */
export const useUpdateBank = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number;
            payload: BankPostRequest;
        }) => updateBankApi(id, payload),

        onSuccess: async () => {
            showSuccessDialog({ title: "Bank Berhasil Diperbarui!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal memperbarui bank" });
        },
    });
};

/**
 * DELETE bank
 */
// export const useDeleteBank = (onSuccessReset?: () => void) => {
//     return useMutation({
//         mutationFn: (id: number) => deleteBankApi(id),

//         onSuccess: async () => {
//             showSuccessDialog({ title: "Bank Berhasil Dihapus!" });
//             if (onSuccessReset) onSuccessReset();
//         },

//         onError: (err: any) => {
//             showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal menghapus bank" });
//         },
//     });
// };
