import { useMutation, useQuery } from "@tanstack/react-query";
import { showSuccessDialog, showErrorDialog } from "@/components/ui/confirm-dialog";
import { createCompanyApi, deleteCompanyApi, getCompanysApi, updateCompanyApi } from "./company.api";
import { CompanyPostRequest } from "./company.types";

export const useGetCompanys = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["Companys", params],
        queryFn: () => getCompanysApi(params),
    });
};

export const useCreateCompany = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: CompanyPostRequest) =>
            createCompanyApi(payload),

        onSuccess: async () => {
            showSuccessDialog({ title: "Perusahaan Berhasil Dibuat!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal membuat perusahaan" });
        },
    });
};

export const useUpdateCompany = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: CompanyPostRequest }) =>
            updateCompanyApi(id, payload),

        onSuccess: async () => {
            showSuccessDialog({ title: "Perusahaan Berhasil Diperbarui!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal memperbarui jabatan" });
        },
    });
};

export const useDeleteCompany = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (id: number) => deleteCompanyApi(id),

        onSuccess: async () => {
            showSuccessDialog({ title: "Perusahaan Berhasil Dihapus!" });
            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            showErrorDialog({ title: "Gagal!", message: err.response?.data?.message || "Gagal menghapus jabatan" });
        },
    });
};