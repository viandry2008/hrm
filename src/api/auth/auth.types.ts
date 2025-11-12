export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        id: number;
        employee_id: number;
        name: string;
        username: string;
        email: string;
        avatar: string | null;
        email_verified_at: string | null;
        last_login_at: string | null;
        role: string;
        status: string;
        remember_token: string | null;
        created_at: string;
        updated_at: string;
        token_type: string;
        token: string;
    } | null;
}

export interface ForgotRequest {
    email: string;
}

export interface ForgotResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        expires_in_minutes: number;
    } | null;
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface responOnlyMessage {
    success: boolean;
    code: number;
    message: string;
}

export interface ResetPasswordRequest {
    email: string;
    otp: string;
    password: string;
    password_confirmation: string;
}