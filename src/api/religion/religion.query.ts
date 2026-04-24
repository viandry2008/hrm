import { useQuery } from "@tanstack/react-query";
import { getReligionsApi } from "./religion.api";

export const useGetReligions = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["religions", params],
        queryFn: () => getReligionsApi(params),
    });
};
