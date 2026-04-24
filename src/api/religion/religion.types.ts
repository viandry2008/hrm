export interface ReligionItem {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface ReligionListResponse {
    success: boolean;
    code: number;
    message: string;
    data: ReligionItem[];
}
