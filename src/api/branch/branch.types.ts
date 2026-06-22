//========= read
export interface BranchItem {
    id: number;
    company_id: number;
    name: string;
    branch_type: string;
    latitude: string | null;
    longitude: string | null;
    radius_meter: number | null;
    address: string | null;
    created_at: string;
    updated_at: string;
}

export interface BranchListResponse {
    success: boolean;
    code: number;
    message: string;
    data: BranchItem[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    }

}

//========= create & update

export interface BranchPostRequest {
    name: string;
    company_id: number;
    branch_type: string;
    radius_meter?: number | null;
    address?: string;
    latitude?: number | null;
    longitude?: number | null;
}

export interface BranchPostResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        id: number;
        company_id: number;
        name: string;
        branch_type: string;
        latitude: string | null;
        longitude: string | null;
        radius_meter: number | null;
        address: string | null;
        created_at: string;
        updated_at: string;
    }
}

//========= delete
export interface BranchDeleteResponse {
    success: boolean;
    code: number;
    message: string;
}