export interface ShiftCompany {
    id: number;
    name: string;
    industry: string;
    province: string;
    city: string;
    district: string | null;
    sub_district: string | null;
    address_detail: string | null;
    latitude: string | null;
    longitude: string | null;
    distance: string | null;
    abbreviation: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface ShiftItem {
    id: number;
    type: string;
    to: string;
    company_id: number;
    start_time: string;
    end_time: string;
    crosses_midnight: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    company: ShiftCompany;
}

export interface ShiftListResponse {
    success: boolean;
    code: number;
    message: string;
    data: ShiftItem[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export interface AttendanceEmployeeDepartment {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface AttendanceEmployeePosition {
    id: number;
    name: string;
    allowance_position: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface AttendanceEmployee {
    id: number;
    employee_code: string;
    full_name: string;
    phone_number: string;
    birth_date: string;
    birth_place: string;
    gender: string;
    address_ktp: string;
    address_domicile: string;
    department_id: number;
    section_id: number;
    position_id: number;
    company_id: number;
    grade_id: number;
    join_date: string;
    end_date: string;
    sio_number: string;
    marital_status_id: number;
    education: string;
    religion: string;
    annual_leave: number;
    group: string;
    referensi: string;
    approved_by: string | null;
    approved_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    department: AttendanceEmployeeDepartment;
    position: AttendanceEmployeePosition;
}

export interface AttendanceItem {
    id: number;
    employee_id: number;
    attendance_date: string;
    clock_in: string | null;
    clock_out: string | null;
    break_start: string | null;
    break_end: string | null;
    clock_in_location: string | null;
    clock_in_location_detail: string | null;
    clock_out_location: string | null;
    clock_out_location_detail: string | null;
    latitude: string | null;
    longitude: string | null;
    notes: string | null;
    clock_out_notes: string | null;
    status: string;
    shift_id: number | null;
    device_model: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    employee: AttendanceEmployee;
    shift: any;
}

export interface AttendanceListResponse {
    success: boolean;
    code: number;
    message: string;
    data: AttendanceItem[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}
