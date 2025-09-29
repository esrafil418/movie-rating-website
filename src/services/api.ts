export type RatePayload = {
  id: string;
  value: number;
  guestSessionId: string;
  type: "movie" | "tv";
};

export type RateResponse = {
  status_code: number;
  status_message: string;
};

export const rateItem = async ({
  id,
  value,
  guestSessionId,
  type,
}: RatePayload): Promise<RateResponse> => {
  const url =
    type === "movie"
      ? `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${guestSessionId}`
      : `https://api.themoviedb.org/3/tv/${id}/rating?guest_session_id=${guestSessionId}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
    },
    body: JSON.stringify({ value }),
  });

  if (!res.ok) throw new Error("Failed to rate item");
  return res.json();
};
