export const fetchMovieDetails = async (movieId: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzBjNTUxYmMxNzJhNDJhNjQ2Yzk1Y2VkZTYxODIyOCIsIm5iZiI6MTUzNjU5ODIyMS40MjIwMDAyLCJzdWIiOiI1Yjk2YTBjZGMzYTM2ODU2NzkwM2Q4MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vNJkjF6ot7s8UCmLgTYzOE4lCZp7NZ8rj6wGss8G2WQ",
      },
    }
  );
  return res.json();
};
