import { useMutation, useQuery } from "@tanstack/react-query";
import { showSuccessDialog, showErrorDialog } from "@/components/ui/confirm-dialog";
import { BranchPostRequest } from "./branch.types";
import { updateBranchApi, deleteBranchApi, getBranchesApi, createBranchApi } from "./branch.api";

export const useGetBranches = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["Branches", params],
        queryFn: () => getBranchesApi(params),
    });
};

export const useCreateBranch = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: BranchPostRequest) =>
            createBranchApi(payload),

        onSuccess: async () => {
            showSuccessDialog({ title: "Cabang Berhasil Dibuat!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal membuat cabang" });
        },
    });
};

export const useUpdateBranch = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: BranchPostRequest }) =>
            updateBranchApi(id, payload),

        onSuccess: async () => {
            showSuccessDialog({ title: "Cabang Berhasil Diperbarui!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal memperbarui cabang" });
        },
    });
};

export const useDeleteBranch = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (id: number) => deleteBranchApi(id),

        onSuccess: async () => {
            showSuccessDialog({ title: "Cabang Berhasil Dihapus!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal menghapus jabatan" });
        },
    });
};