import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { createEmployeeApi, deleteEmployeeApi, deleteMultipleEmployeeApi, getEmployeeApi, getEmployeesApi, getSummaryEmployeeApi, updateEmployeeApi, updateMultipleContractEmployeeApi, updateMultipleStatusEmployeeApi, importEmployeesApi } from "./employee.api";
import { EmployeeMultipleChangeRequest, EmployeeMultipleContractRequest } from "./employee.types";
import { EmployeePostRequest } from "./employee.types";

export const useGetEmployees = (params: {
    search?: string;
    page?: number;
    limit?: number;
    status?: string;
}) => {
    return useQuery({
        queryKey: ["Employees", params],
        queryFn: () => getEmployeesApi(params),
    });
};

export const useGetEmployee = (id?: number | string) => {
    return useQuery({
        queryKey: ["Employee", id],
        queryFn: () => getEmployeeApi(id as number | string),
        enabled: Boolean(id),
    });
};

export const useUpdateEmployee = (
    id?: number | string,
    onSuccessReset?: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: FormData) =>
            updateEmployeeApi(id as number | string, payload),

        onSuccess: async () => {
            Swal.fire({
                title: "Berhasil!",
                text: "Data karyawan berhasil diperbarui.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            // Invalidate supaya data detail re-fetch otomatis
            const normalizedId = String(id);
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["Employee", id] }),
                queryClient.invalidateQueries({ queryKey: ["Employee", normalizedId] }),
                queryClient.invalidateQueries({ queryKey: ["Employees"] }),
            ]);

            onSuccessReset?.();
        },

        onError: (err: any) => {
            console.error("Update error:", err);
            const errorMessage =
                err.response?.data?.message || err.message || "Gagal memperbarui data karyawan";
            Swal.fire("Gagal", errorMessage, "error");
        },
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

export const useGetEmployeeSummary = () => {
    return useQuery({
        queryKey: ["EmployeeSummary"],
        queryFn: () => getSummaryEmployeeApi(),
    });
};

export const useCreateEmployee = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: FormData) => createEmployeeApi(payload),

        onSuccess: async () => {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Karyawan berhasil ditambahkan.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
            });

            onSuccessReset?.();
        },

        onError: (err: any) => {
            console.error("Employee creation error:", err);
            console.error("Error response:", err.response?.data);
            const errorMessage = err.response?.data?.message || err.message || "Gagal menambahkan karyawan";
            Swal.fire("Gagal", errorMessage, "error");
        },
    });
};

export const useImportEmployees = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: FormData) => {

            // ========================
            // TAMPILKAN LOADING SWAL
            // ========================
            Swal.fire({
                title: 'Sedang Mengunggah...',
                html: `
                    <div style="padding: 8px 0 4px;">
                        <p style="color: #64748b; font-size: 14px; margin: 0 0 16px;">
                            Mohon tunggu, data sedang diproses.
                        </p>
                        <div style="
                            width: 100%;
                            height: 6px;
                            background: #e2e8f0;
                            border-radius: 999px;
                            overflow: hidden;
                        ">
                            <div id="swal-progress-bar" style="
                                height: 100%;
                                width: 0%;
                                background: #1E4F85;
                                border-radius: 999px;
                                transition: width 0.3s ease;
                            "></div>
                        </div>
                    </div>
                `,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();

                    // Animasi progress bar palsu
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += Math.random() * 12;
                        if (progress >= 90) {
                            progress = 90;
                            clearInterval(interval);
                        }
                        const bar = document.getElementById('swal-progress-bar');
                        if (bar) bar.style.width = `${progress}%`;
                    }, 300);

                    // Simpan interval di window agar bisa di-clear saat selesai
                    (window as any)._swalProgressInterval = interval;
                },
            });

            return importEmployeesApi(payload);
        },

        onSuccess: async (response: any) => {

            // Selesaikan progress bar ke 100%
            clearInterval((window as any)._swalProgressInterval);
            const bar = document.getElementById('swal-progress-bar');
            if (bar) bar.style.width = '100%';

            await new Promise((r) => setTimeout(r, 400));

            const { data } = response;

            Swal.fire({
                title: 'Berhasil!',
                html: `
                    <div style="text-align: left; padding: 4px 0;">
                        <p style="margin: 0 0 14px; font-size: 14px; color: #64748b;">
                            Import berhasil diselesaikan.
                        </p>
                        <div style="
                            background: #f0fdf4;
                            border: 1px solid #bbf7d0;
                            border-radius: 10px;
                            padding: 14px 16px;
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                        ">
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #15803d;">
                                <span style="font-size: 16px;">✓</span>
                                <span>Dibuat: <strong>${data.created || 0}</strong></span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #2563eb;">
                                <span style="font-size: 16px;">⟲</span>
                                <span>Diperbarui: <strong>${data.updated || 0}</strong></span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #94a3b8;">
                                <span style="font-size: 16px;">⊘</span>
                                <span>Dilewati: <strong>${data.skipped || 0}</strong></span>
                            </div>
                        </div>
                    </div>
                `,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#1E4F85',
            });

            onSuccessReset?.();
        },

        onError: (err: any) => {

            clearInterval((window as any)._swalProgressInterval);

            const response = err.response?.data;

            // ========================
            // HANDLE ERROR VALIDASI
            // ========================
            if (response?.code === 422 && response?.data?.errors) {

                const errors = response.data.errors;

                let errorRowsHTML = '';

                Object.entries(errors).forEach(([row, rowErrors]: any) => {

                    errorRowsHTML += `
                        <tr style="background-color:#fff5f5;">
                            <td colspan="5" style="
                                padding:12px 14px;
                                font-weight:600;
                                color:#e67e22;
                                border-top:1px solid #f1f5f9;
                                font-size:13px;
                            ">
                                ⚠ Baris ${row}
                            </td>
                        </tr>
                    `;

                    rowErrors.forEach((errItem: any, index: number) => {
                        errorRowsHTML += `
                            <tr>
                                <td style="padding:10px 12px; border-top:1px solid #f1f5f9; text-align:center; color:#64748b; font-size:13px;">
                                    ${index + 1}
                                </td>
                                <td style="padding:10px 12px; border-top:1px solid #f1f5f9; text-align:center;">
                                    <span style="
                                        background:#fee2e2; color:#dc2626;
                                        padding:3px 10px; border-radius:999px;
                                        font-weight:600; font-size:12px;
                                    ">${row}</span>
                                </td>
                                <td style="padding:10px 12px; border-top:1px solid #f1f5f9; text-align:center;">
                                    <span style="
                                        background:#dbeafe; color:#2563eb;
                                        padding:3px 10px; border-radius:999px;
                                        font-weight:600; font-size:12px;
                                    ">${errItem.column}</span>
                                </td>
                                <td style="padding:10px 12px; border-top:1px solid #f1f5f9; color:#475569; font-size:13px;">
                                    ${errItem.field || '-'}
                                </td>
                                <td style="padding:10px 12px; border-top:1px solid #f1f5f9; color:#334155; font-size:13px;">
                                    ${errItem.message}
                                </td>
                            </tr>
                        `;
                    });
                });

                Swal.fire({
                    width: '860px',
                    background: '#ffffff',
                    showCloseButton: true,
                    confirmButtonText: '✓ OK, Mengerti',
                    confirmButtonColor: '#1E4F85',
                    html: `
                        <div style="padding: 4px 8px 8px; font-family: Inter, sans-serif;">

                            <div style="
                                width: 64px; height: 64px;
                                margin: 0 auto 16px;
                                border-radius: 50%;
                                border: 2.5px solid #1E4F85;
                                display: flex; align-items: center; justify-content: center;
                                font-size: 32px; color: #1E4F85; font-weight: 700;
                            ">!</div>

                            <h2 style="font-size: 22px; font-weight: 700; color: #1E4F85; margin-bottom: 6px;">
                                Import Gagal
                            </h2>

                            <p style="color: #64748b; font-size: 13px; margin-bottom: 18px;">
                                Import tidak dapat diselesaikan karena terdapat beberapa data yang tidak valid.
                            </p>

                            <div style="text-align: left;">
                                <p style="font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 10px;">
                                    Detail Error
                                </p>
                                <div style="
                                    border: 1px solid #e2e8f0;
                                    border-radius: 10px;
                                    overflow: hidden;
                                    max-height: 380px;
                                    overflow-y: auto;
                                ">
                                    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                                        <thead style="background: #f8fafc; position: sticky; top: 0;">
                                            <tr>
                                                <th style="padding:10px 12px; text-align:center; color:#475569; font-weight:600;">No</th>
                                                <th style="padding:10px 12px; text-align:center; color:#475569; font-weight:600;">Baris</th>
                                                <th style="padding:10px 12px; text-align:center; color:#475569; font-weight:600;">Kolom</th>
                                                <th style="padding:10px 12px; text-align:left; color:#475569; font-weight:600;">Field</th>
                                                <th style="padding:10px 12px; text-align:left; color:#475569; font-weight:600;">Error</th>
                                            </tr>
                                        </thead>
                                        <tbody>${errorRowsHTML}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    `,
                });

                return;
            }

            // ========================
            // DEFAULT ERROR
            // ========================
            Swal.fire({
                title: 'Gagal',
                text: response?.message || 'Gagal mengunggah file Excel',
                icon: 'error',
                confirmButtonColor: '#1E4F85',
            });
        },
    });
};

export const useDeleteMultipleEmployee = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: { ids: number[] }) =>
            deleteMultipleEmployeeApi(payload),

        onSuccess: () => {
            Swal.fire({
                title: "Berhasil!",
                text: "Karyawan dipilih berhasil dihapus.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            if (onSuccessReset) onSuccessReset();
        },

        onError: (err: any) => {
            Swal.fire(
                "Gagal",
                err.response?.data?.message || "Gagal menghapus karyawan",
                "error"
            );
        },
    });
};

export const useUpdateMultipleStatusEmployee = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: EmployeeMultipleChangeRequest) =>
            updateMultipleStatusEmployeeApi(payload),

        onSuccess: () => {
            Swal.fire({
                title: "Berhasil!",
                text: "Status karyawan berhasil diupdate.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            onSuccessReset?.();
        },

        onError: (err: any) => {
            Swal.fire(
                "Gagal",
                err.response?.data?.message || "Gagal update status.",
                "error"
            );
        },
    });
};

export const useUpdateMultipleContractEmployee = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: EmployeeMultipleContractRequest) =>
            updateMultipleContractEmployeeApi(payload),

        onSuccess: () => {
            Swal.fire({
                title: "Berhasil!",
                text: "Kontrak karyawan berhasil diperbarui.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            onSuccessReset?.();
        },

        onError: (err: any) => {
            Swal.fire(
                "Gagal",
                err.response?.data?.message || "Gagal update kontrak.",
                "error"
            );
        },
    });
};
