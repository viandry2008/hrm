//========= read
export interface CategoryItem {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface CategoryListResponse {
    success: boolean;
    code: number;
    message: string;
    data: CategoryItem[];
    meta?: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    }
}

//========= create & update

export interface CategoryPostRequest {
    name: string;
}

export interface CategoryPostResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
    }
}

//========= delete
export interface CategoryDeleteResponse {
    success: boolean;
    code: number;
    message: string;
}