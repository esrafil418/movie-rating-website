import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import { rateItem } from "../services/api";
import type { RatePayload, RateResponse } from "../services/api";

export const useRate = (): UseMutationResult<
  RateResponse,
  Error,
  RatePayload
> => {
  const queryClient = useQueryClient();

  return useMutation<RateResponse, Error, RatePayload>({
    mutationFn: rateItem,
    onSuccess: (_, variables) => {
      if (!variables?.guestSessionId) return;
      const key = variables.type === "movie" ? "ratedMovies" : "ratedTvShows";
      queryClient.invalidateQueries({
        queryKey: [key, variables.guestSessionId],
      });
    },
  });
};
