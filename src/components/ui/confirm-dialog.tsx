import Swal from 'sweetalert2';

interface ConfirmDialogOptions {
  title?: string;
  message?: string;
  confirmText?: string;
}

export const showSuccessDialog = ({
  title = 'Success!',
  message,
  confirmText = 'OK',
}: ConfirmDialogOptions = {}) => {
  Swal.fire({
    icon: 'success',
    title: `<span style="color: white;">${title}</span>`,
    text: message,
    background: '#1E4F85',
    color: 'white',
    confirmButtonColor: '#ffffff',
    confirmButtonText: `<span style="color: #1E4F85; font-weight: bold;">${confirmText}</span>`,
    customClass: {
      popup: 'rounded-xl',
      title: 'text-xl',
      confirmButton: 'text-sm px-6 py-2 rounded-lg',
    },
  });
};

export const showErrorDialog = ({
  title = 'Error!',
  message,
  confirmText = 'OK',
}: ConfirmDialogOptions = {}) => {
  Swal.fire({
    icon: 'error',
    title: `<span style="color: white;">${title}</span>`,
    text: message,
    background: '#dc2626',
    color: 'white',
    confirmButtonColor: '#ffffff',
    confirmButtonText: `<span style="color: white; font-weight: bold;">${confirmText}</span>`,
    customClass: {
      popup: 'rounded-xl',
      title: 'text-xl',
      confirmButton: 'text-sm px-6 py-2 rounded-lg',
    },
  });
};

export const showConfirmDialog = ({
  title = 'Confirmation',
  message,
  confirmText = 'Yes',
  cancelText = 'Cancel',
}: ConfirmDialogOptions & { cancelText?: string } = {}) => {
  return Swal.fire({
    icon: 'question',
    title: `<span style="color: white;">${title}</span>`,
    text: message,
    background: '#1E4F85',
    color: 'white',
    showCancelButton: true,
    confirmButtonColor: '#ffffff',
    cancelButtonColor: '#6b7280',
    confirmButtonText: `<span style="color: #1E4F85; font-weight: bold;">${confirmText}</span>`,
    cancelButtonText: `<span style="color: white; font-weight: bold;">${cancelText}</span>`,
    customClass: {
      popup: 'rounded-xl',
      title: 'text-xl',
      confirmButton: 'text-sm px-6 py-2 rounded-lg',
      cancelButton: 'text-sm px-6 py-2 rounded-lg',
    },
  });
};

export const showWarningDialog = ({
  title = 'Warning!',
  message,
  confirmText = 'Yes',
  cancelText = 'Cancel',
}: ConfirmDialogOptions & { cancelText?: string } = {}) => {
  return Swal.fire({
    icon: 'warning',
    title: `<span style="color: white;">${title}</span>`,
    text: message,
    background: '#f59e0b',
    color: 'white',
    showCancelButton: true,
    confirmButtonColor: '#ffffff',
    cancelButtonColor: '#6b7280',
    confirmButtonText: `<span style="color: #f59e0b; font-weight: bold;">${confirmText}</span>`,
    cancelButtonText: `<span style="color: white; font-weight: bold;">${cancelText}</span>`,
    customClass: {
      popup: 'rounded-xl',
      title: 'text-xl',
      confirmButton: 'text-sm px-6 py-2 rounded-lg',
      cancelButton: 'text-sm px-6 py-2 rounded-lg',
    },
  });
};

export const showLogoutDialog = async (): Promise<boolean> => {
  const result = await Swal.fire({
    icon: 'question',
    title: '<span style="color: white;">Konfirmasi Keluar</span>',
    text: 'Apakah Anda yakin ingin keluar dari aplikasi?',
    background: '#1E4F85',
    color: 'white',
    showCancelButton: true,
    confirmButtonColor: '#ffffff',
    cancelButtonColor: '#6b7280',
    confirmButtonText: '<span style="color: #1E4F85; font-weight: bold;">Ya, Keluar</span>',
    cancelButtonText: '<span style="color: white; font-weight: bold;">Batal</span>',
    customClass: {
      popup: 'rounded-xl',
      title: 'text-xl',
      confirmButton: 'text-sm px-6 py-2 rounded-lg',
      cancelButton: 'text-sm px-6 py-2 rounded-lg',
    },
  });
  return result.isConfirmed;
};