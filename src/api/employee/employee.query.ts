import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { deleteEmployeeApi, getEmployeesApi } from "./employee.api";

export const useGetEmployees = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["Employees", params],
        queryFn: () => getEmployeesApi(params),
    });
};

export const useDeleteEmployee = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (id: number) => deleteEmployeeApi(id),

        onSuccess: async (data) => {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Karyawan berhasil dihapus.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                background: '#3b82f6',
                color: '#ffffff',
                customClass: {
                    popup: 'bg-blue-500 text-white',
                },
            });

            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            Swal.fire("Gagal", err.response?.data?.message || "Gagal menghapus Employee", "error");
        },
    });
};