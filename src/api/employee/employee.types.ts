import { use } from "marked";

//========= read
export interface PositionItem {
    id: number;
    name: string;
    allowance_position: string | null;
    description: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface UserItem {
    id: number;
    employee_id: number;
    name: string;
    username: string;
    email: string;
    avatar: string | null;
    email_verified_at: string | null;
    last_login_at: string | null;
    role_id: number;
    status: string;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface DepartmentItem {
    id: number;
    name: string;
    description: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface LatestItem {
    id: number,
    employee_id: number,
    contract_number: string,
    start_date: string,
    end_date: string
    category: {
        id: number;
        name: string;
    };

}

export interface EmployeeItem {
    id: number;
    employee_code: string;
    full_name: string;
    phone_number: string;
    birth_date: string;
    birth_place: string;
    gender: string;
    national_id: string;
    family_card_number: string | null;
    address_ktp: string | null;
    address_domicile: string | null;
    department_id: number;
    position_id: number;
    company_id: number;
    grade_id: number;
    join_date: string;
    end_date: string | null;
    sio_number: string | null;
    marital_status: string;
    education: string | null;
    religion: string | null;
    annual_leave: number;
    bank_id: number;
    bank_account_number: string | null;
    employment_status: string;
    employee_type: string;
    approved_by: number | null;
    approved_at: string | null;
    tax_number: string | null;
    bpjstk_number: string | null;
    bpjs_number: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    user: UserItem;
    department: DepartmentItem;
    position: PositionItem;
    latest_contract: LatestItem;
}

export interface EmployeeListResponse {
    success: boolean;
    code: number;
    message: string;
    data: EmployeeItem[],
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };

}

export interface EmployeeDetailResponse {
    success: boolean;
    code: number;
    message: string;
    data: any;
}


//========= create & update
export interface EmployeePostRequest {
    employee_code?: string;
    full_name?: string;
    phone_number?: string;
    gender?: string;
    marital_status_id?: number | null;
    department_id?: number | null;
    position_id?: number | null;
    company_id?: number | null;
    grade_id?: number | null;
    bank_id?: number | null;
    address_ktp?: string | null;
    address_domicile?: string | null;
    employment_status?: string;
    employee_type?: string;
    join_date?: string;
    birth_date?: string;
    birth_place?: string;
    national_id?: string | null;
    family_card_number?: string | null;
    education?: string | null;
    religion?: string | null;
    tax_number?: string | null;
    bpjstk_number?: string | null;
    bpjs_number?: string | null;
    bank_account_number?: string | null;
    bank_account_holder_name?: string | null;
}

export interface EmployeePostResponse {
    success: boolean;
    code: number;
    message: string;
    data: any;
}


//========= message
export interface EmployeeMessageResponse {
    success: boolean;
    code: number;
    message: string;
}

//========= summary
export interface EmployeeSummaryResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        total: number;
        active: number;
        inactive: number;
        expired: number;
    };
}

//========= multiple delete employees
export interface EmployeeMultipleDeleteRequest {
    ids: number[];
}

//========= multiple change status employees
export interface EmployeeMultipleChangeRequest {
    ids: number[];
    status: string;
}

//========= multiple change contract employees
export interface EmployeeMultipleContractRequest {
    ids: number[];
    contract_category_id: number;
    start_date: string;
    end_date: string;
    notes: string;
}
