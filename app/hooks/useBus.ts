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

  const busDetails = useQuery({
    queryKey: ["busDetails"],
    queryFn: getBusDetailsUseCase,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const updateBusDetails = useMutation({
    mutationFn: updateBusDetailsUseCase,
    onMutate: async () => {
      setError(null);
      setSuccess(null);
    },
    onSuccess: async (res: any, _variables, _context) => {
      setError(null);
      setSuccess(res.message);
    },
    onError: (res: any, _variables, _context) => {
      setError(res.message);
      setSuccess(null);
    },
  });

  const queryRoutes = (query: string) =>
    useQuery({
      queryKey: ["routes", query],
      queryFn: () => queryRoutesUseCase(query),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      enabled: query.trim().length > 0,
    });

  const changeBusRoute = useMutation({
    mutationFn: changeBusRouteUseCase,
    onMutate: async () => {
      setError(null);
      setSuccess(null);
    },
    onSuccess: async (res: any, _variables, _context) => {
      setError(null);
      setSuccess(res.message);
    },
    onError: (res: any, _variables, _context) => {
      setError(res.message);
      setSuccess(null);
    },
  });

  return {
    busDetails,
    updateBusDetails,
    queryRoutes,
    changeBusRoute,
    error,
    success,
  };
}
