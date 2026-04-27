//========= read
export interface BankItem {
    id: number;
    name: string;
    code: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface BankListResponse {
    success: boolean;
    code: number;
    message: string;
    data: BankItem[];
    meta?: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    }
}

//========= create & update

export interface BankPostRequest {
    name: string;
    code: string;
}

export interface BankPostResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        id: number;
        name: string;
        code: string;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    }
}

//========= delete
export interface BankDeleteResponse {
    success: boolean;
    code: number;
    message: string;
}