import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBusDetailsUseCase,
  updateBusDetailsUseCase,
  queryRoutesUseCase,
  changeBusRouteUseCase,
} from "../api/bus-usecases";
import { useState } from "react";

export function useBus() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const useBusDetails = useQuery({
    queryKey: ["busDetails"],
    queryFn: getBusDetailsUseCase,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const useUpdateBusDetails = useMutation({
    mutationFn: updateBusDetailsUseCase,
    onMutate: () => {
      setError(null);
      setSuccess(null);
    },
    onSuccess: async (res: any) => {
      setError(null);
      setSuccess(res.message);
    },
    onError: (res: any) => {
      setError(res.message);
      setSuccess(null);
    },
  });

  const useQueryRoutes = (query: string) =>
    useQuery({
      queryKey: ["routes", query],
      queryFn: () => queryRoutesUseCase(query),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      enabled: query.trim().length > 0,
      onError: (res: any) => {
        setError(res.message);
      },
    });

  const useChangeBusRoute = useMutation({
    mutationFn: changeBusRouteUseCase,
    onMutate: () => {
      setError(null);
      setSuccess(null);
    },
    onSuccess: async (res: any) => {
      setError(null);
      setSuccess(res.message);
    },
    onError: (res: any) => {
      setError(res.message);
      setSuccess(null);
    },
  });

  return {
    useBusDetails,
    useUpdateBusDetails,
    useQueryRoutes,
    useChangeBusRoute,
    error,
    success,
  };
}
