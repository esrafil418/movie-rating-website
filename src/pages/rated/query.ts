export const fetchRatedMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guest_session_id"
    )}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  return res.json();
};

export const fetchRatedTvShows = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guest_session_id"
    )}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  return res.json();
};
