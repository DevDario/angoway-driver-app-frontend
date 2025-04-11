import { useQuery } from "@tanstack/react-query";
import { getBusDetailsUseCase } from "../api/bus-usecases";

export function useBus() {

    const useBusDetails = useQuery({
        queryKey: ["busDetails"],
        queryFn: getBusDetailsUseCase,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10
    })

    return {
        useBusDetails
    }

}
