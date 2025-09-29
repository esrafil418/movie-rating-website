import { useMutation, useQueryClient } from "@tanstack/react-query";

export type RateMoviePayload = {
  movieId: string;
  value: number;
  guestSessionId: string;
};

export type RateMovieResponse = {
  status_code: number;
  status_message: string;
};

export const useRateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation<RateMovieResponse, Error, RateMoviePayload>({
    mutationFn: async ({
      movieId,
      value,
      guestSessionId,
    }: RateMoviePayload) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
          },
          body: JSON.stringify({ value }),
        }
      );

      if (!res.ok) throw new Error("Failed to rate movie");
      return res.json();
    },
    onSuccess: (_, variables) => {
      // فقط اگر guestSessionId معتبر بود invalidate کن
      if (variables?.guestSessionId) {
        queryClient.invalidateQueries({
          queryKey: ["ratedMovies", variables.guestSessionId],
        });
      }
    },
  });
};
