import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { ReligionListResponse } from "./religion.types";

export const getReligionsApi = async (
    params: { search?: string; limit?: number; page?: number }
): Promise<ReligionListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.RELIGIONS, { params });
    return data;
};
