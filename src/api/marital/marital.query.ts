import { useQuery } from "@tanstack/react-query";
import { getMaritalsApi } from "./marital.api";

export const useGetMaritals = (params: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    return useQuery({
        queryKey: ["Maritals", params],
        queryFn: () => getMaritalsApi(params),
    });
};