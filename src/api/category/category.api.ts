import apiClient from "../client";
import { ENDPOINTS } from "../endpoints";
import {
    CategoryListResponse,
    CategoryPostResponse,
    CategoryPostRequest,
    // CategoryDetailResponse,
    // ApiBaseResponse,
} from "./category.types";

/**
 * GET list categories (search + pagination)
 */
export const getCategoriesApi = async (
    params: { search?: string; limit?: number; page?: number }
): Promise<CategoryListResponse> => {
    const { data } = await apiClient.get(ENDPOINTS.CATEGORIES, { params });
    return data;
};

/**
 * CREATE category
 */
export const createCategoryApi = async (
    payload: CategoryPostRequest
): Promise<CategoryPostResponse> => {
    const { data } = await apiClient.post(ENDPOINTS.CATEGORIES, payload);
    return data;
};

/**
 * GET detail category
 */
// export const getCategoryDetailApi = async (
//     id: number
// ): Promise<CategoryDetailResponse> => {
//     const { data } = await apiClient.get(`${ENDPOINTS.CATEGORIES}/${id}`);
//     return data;
// };

/**
 * UPDATE category
 */
export const updateCategoryApi = async (
    id: number,
    payload: CategoryPostRequest
): Promise<CategoryPostResponse> => {
    const { data } = await apiClient.put(`${ENDPOINTS.CATEGORIES}/${id}`, payload);
    return data;
};

/**
 * DELETE category
 */
// export const deleteCategoryApi = async (
//     id: number
// ): Promise<ApiBaseResponse> => {
//     const { data } = await apiClient.delete(`${ENDPOINTS.CATEGORIES}/${id}`);
//     return data;
// };
