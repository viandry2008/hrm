import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { RoleListResponse } from "./role.types";

export const getRolesApi = async (
    params: { search?: string; limit?: number; page?: number }
): Promise<RoleListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.ROLES, { params });
    return data;
};
