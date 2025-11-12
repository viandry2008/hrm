import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { RegisterTrialRequest } from "./trial.types";
import { trialRegisterApi } from "./trial.api";

export const useTrialRegister = (onSuccessReset?: () => void) => {
    return useMutation({
        mutationFn: (payload: RegisterTrialRequest) => trialRegisterApi(payload),
        onSuccess: async (data) => {
            Swal.fire({
                icon: 'success',
                title: '<span style="color: white;">Berhasil Mendaftar!</span>',
                text: 'Tim Kami Akan Segera Menghubungi Anda Segera dalam 1x24jam',
                background: '#1166d8',
                color: 'white',
                confirmButtonColor: '#ffffff',
                confirmButtonText:
                    '<span style="color: #1166d8; font-weight: bold;">OK</span>',
                customClass: {
                    popup: 'rounded-xl',
                    title: 'text-xl',
                    confirmButton: 'text-sm px-6 py-2 rounded-lg',
                },
            });

            if (onSuccessReset) onSuccessReset();
        },
        onError: (err: any) => {
            Swal.fire("Gagal", err.response?.data?.message || "Gagal mengirim email", "error");
        },
    });
};