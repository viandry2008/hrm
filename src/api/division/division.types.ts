//========= read
export interface DepartmentItem {
    id: number;
    department_name: string;
    description: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface DepartmentListResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        items: DepartmentItem[];
        pagination: {
            current_page: number;
            per_page: number;
            total: number;
            last_page: number;
        }
    };
}

//========= create & update

export interface DepartmentPostRequest {
    department_name: string;
    description: string | null;
}

export interface DepartmentPostResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        id: number;
        department_name: string;
        description: string | null;
        created_at: string;
        updated_at: string;
    }
}

//========= delete
export interface DepartmentDeleteResponse {
    success: boolean;
    code: number;
    message: string;
}