import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { MaritalListResponse } from "./marital.types";

export const getMaritalsApi = async (
    params: { search?: string; limit?: number; page?: number }
): Promise<MaritalListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.MARITALS, { params });
    return data;
};