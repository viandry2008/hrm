// src/lib/swal.helper.ts

import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";

// ========================
// BASE CONFIG
// ========================

const darkConfig: SweetAlertOptions = {
    background: "#0F2A4D",
    color: "white",
    confirmButtonColor: "#ffffff",
    confirmButtonText: '<span style="color: #0F2A4D; font-weight: bold;">OK</span>',
    customClass: {
        popup: "rounded-xl",
        title: "text-xl",
        confirmButton: "text-sm px-6 py-2 rounded-lg",
    },
};

const errorConfig: SweetAlertOptions = {
    background: "#d11a2a",
    color: "white",
    confirmButtonColor: "#ffffff",
    confirmButtonText: '<span style="color: #d11a2a; font-weight: bold;">OK</span>',
    customClass: {
        popup: "rounded-xl",
        title: "text-xl",
        confirmButton: "text-sm px-6 py-2 rounded-lg",
    },
};

// ========================
// TITLE HELPER
// ========================

const whiteTitle = (text: string) =>
    `<span style="color: white">${text}</span>`;

// ========================
// PRESET ALERTS
// ========================

export const SwalSuccess = (title: string, text?: string) =>
    Swal.fire({
        ...darkConfig,
        title: whiteTitle(title),
        text,
        icon: "success",
    });

export const SwalError = (title: string, text?: string) =>
    Swal.fire({
        ...errorConfig,
        title: whiteTitle(title),
        text,
        icon: "error",
    });

export const SwalWarning = (title: string, text?: string) =>
    Swal.fire({
        ...darkConfig,
        title: whiteTitle(title),
        text,
        icon: "warning",
    });

// ========================
// CONFIRM DIALOG
// ========================

export const SwalConfirm = (title: string, text?: string) =>
    Swal.fire({
        ...darkConfig,
        title: whiteTitle(title),
        text,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: '<span style="color: #0F2A4D; font-weight: bold;">Ya</span>',
        cancelButtonText: "Batal",
        cancelButtonColor: "#64748b",
    });

// ========================
// CUSTOM (escape hatch)
// ========================

// export const SwalCustom = (options: SweetAlertOptions) =>
//     Swal.fire({ ...darkConfig, ...options });