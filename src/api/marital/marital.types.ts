export interface MaritalItem {
    id: number;
    name: string;
    amount: string;
    category: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface MaritalListResponse {
    success: boolean;
    code: number;
    message: string;
    data: MaritalItem[];
}