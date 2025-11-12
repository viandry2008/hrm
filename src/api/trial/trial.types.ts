export interface RegisterTrialRequest {
    full_name: string;
    company_name: string;
    company_position: string;
    total_employees: number;
    phone_number: string;
    email: string;
    meeting_location: string;
    company_address: string;
}

export interface RegisterTrialResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        id: number;
        full_name: string;
        company_name: string;
        company_position: string;
        total_employees: number;
        phone_number: string;
        email: string;
        meeting_location: string;
        created_at: string;
        updated_at: string;
    } | null;
}
