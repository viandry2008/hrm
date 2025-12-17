export interface ApiBaseResponse {
    success: boolean;
    code: number;
    message: string;
}

//========= read
export interface DepartmentItem {
    id: number;
    department_name: string;
    description: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface SectionItem {
    id: number;
    department_id: number;
    section_name: string;
    description: string | null;
    created_at: string | null;
    updated_at: string | null;
    department: DepartmentItem;
}

export interface SectionListResponse extends ApiBaseResponse {
    data: {
        items: SectionItem[];
        pagination: {
            current_page: number;
            per_page: number;
            total: number;
            last_page: number;
        };
    };
}

//========= create & update
export interface SectionPostRequest {
    department_id: number;
    section_name: string;
    description?: string | null;
}

export interface SectionPostResponse extends ApiBaseResponse {
    data: {
        id: number;
        department_id: number;
        section_name: string;
        description: string | null;
        created_at: string;
        updated_at: string;
    };
}

//=========  detail
export interface SectionDetailResponse extends ApiBaseResponse {
    data: {
        id: number;
        department_id: number;
        section_name: string;
        description: string | null;
        created_at: string;
        updated_at: string;
        department: DepartmentItem;
    };
}
