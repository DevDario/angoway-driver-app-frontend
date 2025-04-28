import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBusDetailsUseCase,
  updateBusDetailsUseCase,
} from "../api/bus-usecases";
import { useState } from "react";

export function useBus() {
  const [error, setError] = useState<string | null>(null);
  const useBusDetails = useQuery({
    queryKey: ["busDetails"],
    queryFn: getBusDetailsUseCase,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const useUpdateBusDetails = useMutation({
    mutationFn: updateBusDetailsUseCase,
    onSuccess: () => {},
    onError: (req: any) => {
      setError(req.response.data.message);
    },
  });

  return {
    useBusDetails,
    useUpdateBusDetails,
    error,
  };
}
