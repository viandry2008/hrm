//========= read
export interface CompanyItem {
    id: number;
    name: string;
    industry: string;
    province: string | null;
    city: string | null;
    district: string | null;
    sub_district: string | null;
    address_detail: string | null;
    latitude: number | null;
    longitude: number | null;
    distance: number | null;
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
    province?: string;
    city?: string;
    district?: string;
    sub_district?: string;
    address_detail?: string;
    latitude?: number | null;
    longitude?: number | null;
    distance?: number | null;
    abbreviation?: string | null;
}

export interface CompanyPostResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        id: number;
        name: string;
        // industry: string;
        // province: string | null;
        // city: string | null;
        // district: string | null;
        // sub_district: string | null;
        address_detail: string | null;
        latitude: number | null;
        longitude: number | null;
        distance: number | null;
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