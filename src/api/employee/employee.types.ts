//========= read
export interface PositionItem {
    id: number;
    position_name: string;
    allowance_position: string | null;
    description: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface DepartmentItem {
    id: number;
    department_name: string;
    description: string | null;
    created_at: string | null;
    updated_at: string | null;
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

    department: DepartmentItem;
    position: PositionItem;
}

export interface EmployeeListResponse {
    success: boolean;
    code: number;
    message: string;
    data: {
        items: EmployeeItem[];
        pagination: {
            current_page: number;
            per_page: number;
            total: number;
            last_page: number;
        };
    };
}


//========= create & update


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
    contract_type: string;
    start_date: string;
    end_date: string;
    notes: string;
}