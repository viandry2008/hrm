export interface RoleItem {
    id: number;
    name_role: string;
    slug_role: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface RoleListResponse {
    success: boolean;
    code: number;
    message: string;
    data: RoleItem[];
}
