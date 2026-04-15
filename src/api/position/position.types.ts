//========= read
export interface PositionItem {
    id: number;
    name: string;
    allowance_position: string | null;
    description: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface PositionListResponse {
    success: boolean;
    code: number;
    message: string;
    data: PositionItem[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    }

}

//========= create & update

export interface PositionPostRequest {
    name: string;
    allowance_position?: string | null;
    description?: string | null;
}

export interface PositionPostResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        id: number;
        name: string;
        allowance_position: string | null;
        description: string | null;
        created_at: string;
        updated_at: string;
    }
}

//========= delete
export interface PositionDeleteResponse {
    success: boolean;
    code: number;
    message: string;
}