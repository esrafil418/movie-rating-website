// services/tmdb.ts
export const fetchMovies = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
      },
    }
  );

  if (!res.ok) throw new Error(`Movies API error: ${res.status}`);
  return res.json();
};

export const fetchTvShows = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
      },
    }
  );

  if (!res.ok) throw new Error(`TV Shows API error: ${res.status}`);
  return res.json();
};

export const fetchMovieDetails = async (movieId: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
      },
    }
  );
  return res.json();
};

export const fetchTvShowDetails = async (tvShowId: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_BEARER}`,
      },
    }
  );
  return res.json();
};

export const fetchRatedMovies = async () => {
  const guestSessionId = localStorage.getItem("guest_session_id");
  if (!guestSessionId) return { results: [] };

  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  return res.json();
};

export const fetchRatedTvShows = async () => {
  const guestSessionId = localStorage.getItem("guest_session_id");
  if (!guestSessionId) return { results: [] };

  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  return res.json();
};
