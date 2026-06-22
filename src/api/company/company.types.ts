//========= read
export interface CompanyItem {
    id: number;
    name: string;
    industry: string;
    abbreviation: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface CompanyListResponse {
    success: boolean;
    code: number;
    message: string;
    data: CompanyItem[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    }

}

//========= create & update

export interface CompanyPostRequest {
    name: string;
    industry: string;
    abbreviation?: string | null;
}

export interface CompanyPostResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        id: number;
        name: string;
        industry: string;
        abbreviation: string | null;
        created_at: string;
        updated_at: string;
    }
}

//========= delete
export interface CompanyDeleteResponse {
    success: boolean;
    code: number;
    message: string;
}