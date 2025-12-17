import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import {
    SectionListResponse,
    SectionPostResponse,
    SectionPostRequest,
    SectionDetailResponse,
    ApiBaseResponse,
} from "./section.types";

/**
 * GET list sections (search + pagination)
 */
export const getSectionsApi = async (
    params: { search?: string; limit?: number; page?: number }
): Promise<SectionListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.SECTIONS, { params });
    return data;
};

/**
 * CREATE section
 */
export const createSectionApi = async (
    payload: SectionPostRequest
): Promise<SectionPostResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.SECTIONS, payload);
    return data;
};

/**
 * GET detail section
 */
export const getSectionDetailApi = async (
    id: number
): Promise<SectionDetailResponse> => {
    const { data } = await apiClient.get(`${ENDPOINTS.SECTIONS}/${id}`);
    return data;
};

/**
 * UPDATE section
 */
export const updateSectionApi = async (
    id: number,
    payload: SectionPostRequest
): Promise<SectionPostResponse> => {
    const { data } = await apiClient.put(`${ENDPOINTS.SECTIONS}/${id}`, payload);
    return data;
};

/**
 * DELETE section
 */
export const deleteSectionApi = async (
    id: number
): Promise<ApiBaseResponse> => {
    const { data } = await apiClient.delete(`${ENDPOINTS.SECTIONS}/${id}`);
    return data;
};
