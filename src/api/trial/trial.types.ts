export interface RegisterTrialRequest {
    full_name: string;
    company_name: string;
    industry: string;
    company_position: string;
    phone_number: string;
    email: string;
    meeting_location: 'offline' | 'online' | string;
    meeting_address: string;
    address_detail: string;
    message: string;
}


export interface RegisterTrialResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        register: {
            id: number;
            full_name: string;
            company_id: number;
            company_position: string;
            phone_number: string;
            email: string;
            meeting_location: string;
            meeting_address: string;
            message: string;
            created_at: string;
            updated_at: string;
        };
        company: {
            id: number;
            name: string;
            industry: string;
            address_detail: string;
            created_at: string;
            updated_at: string;
        };
    } | null;
}
