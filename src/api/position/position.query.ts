import { useMutation, useQuery } from "@tanstack/react-query";
import { createPositionApi, deletePositionApi, getPositionsApi, updatePositionApi } from "./position.api";
import { PositionPostRequest } from "./position.types";
import { showSuccessDialog, showErrorDialog } from "@/components/ui/confirm-dialog";

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

        onSuccess: async () => {
            showSuccessDialog({ title: "Jabatan Berhasil Dibuat!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal membuat jabatan" });
        },
    });
};

export const useUpdatePosition = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: PositionPostRequest }) =>
            updatePositionApi(id, payload),

        onSuccess: async () => {
            showSuccessDialog({ title: "Jabatan Berhasil Diperbarui!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal memperbarui jabatan" });
        },
    });
};

export const useDeletePosition = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (id: number) => deletePositionApi(id),

        onSuccess: async () => {
            showSuccessDialog({ title: "Jabatan Berhasil Dihapus!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal menghapus jabatan" });
        },
    });
};