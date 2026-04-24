import { useQuery } from "@tanstack/react-query";
import { getRolesApi } from "./role.api";

export const useGetRoles = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["roles", params],
        queryFn: () => getRolesApi(params),
    });
};
