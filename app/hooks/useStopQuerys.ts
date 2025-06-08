import { useQuery } from "@tanstack/react-query";
import { getStops, getStopById } from "../api/stops-usecases";

export const useGetStops = () =>
  useQuery({
    queryKey: ["stops"],
    queryFn: getStops,
    staleTime: 1000 * 60 * 5,
  });

export const useGetStopById = (id: number) =>
  useQuery({
    queryKey: ["stop", id],
    queryFn: () => getStopById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
