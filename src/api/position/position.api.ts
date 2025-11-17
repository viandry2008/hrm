import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import { PositionDeleteResponse, PositionListResponse, PositionPostRequest, PositionPostResponse, } from "./position.types";

export const getPositionsApi = async (
    params: { search?: string; limit?: number; page?: number }
): Promise<PositionListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.POSITIONS, { params });
    return data;
};

export const createPositionApi = async (
    payload: PositionPostRequest
): Promise<PositionPostResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.POSITIONS, payload);
    return data;
};

export const updatePositionApi = async (
    id: number,
    payload: PositionPostRequest
): Promise<PositionPostResponse> => {
    const { data } = await apiClient.put(`${ENDPOINTS.POSITIONS}/${id}`, payload);
    return data;
};

export const deletePositionApi = async (
    id: number
): Promise<PositionDeleteResponse> => {
    const { data } = await apiClient.delete(`${ENDPOINTS.POSITIONS}/${id}`);
    return data;
};

