import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

type RateTvShowPayload = {
  tvShowId: string;
  value: number;
  guestSessionId: string;
};

type RateTvShowResponse = {
  status_code: number;
  status_message: string;
};

export const rateTvShow = async ({
  tvShowId,
  value,
  guestSessionId,
}: RateTvShowPayload): Promise<RateTvShowResponse> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvShowId}/rating?guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER}`, // مقدار env را بررسی کن
      },
      body: JSON.stringify({ value }),
    }
  );

  if (!res.ok) throw new Error(`Failed to rate TV show: ${res.status}`);

  return res.json();
};

// 🪄 Hook آماده برای استفاده با type کامل
export const useRateTvShow = (): UseMutationResult<
  RateTvShowResponse,
  Error,
  RateTvShowPayload
> => {
  const queryClient = useQueryClient();

  return useMutation<RateTvShowResponse, Error, RateTvShowPayload>({
    mutationFn: rateTvShow,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ratedTvShows", localStorage.getItem("guest_session_id")],
      });
    },
  });
};
