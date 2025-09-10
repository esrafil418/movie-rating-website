export const fetchMovies = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzBjNTUxYmMxNzJhNDJhNjQ2Yzk1Y2VkZTYxODIyOCIsIm5iZiI6MTUzNjU5ODIyMS40MjIwMDAyLCJzdWIiOiI1Yjk2YTBjZGMzYTM2ODU2NzkwM2Q4MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vNJkjF6ot7s8UCmLgTYzOE4lCZp7NZ8rj6wGss8G2WQ",
      },
    }
  );
  console.log(res.json());
  return res.json();
};

export const fetchTvShows = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzBjNTUxYmMxNzJhNDJhNjQ2Yzk1Y2VkZTYxODIyOCIsIm5iZiI6MTUzNjU5ODIyMS40MjIwMDAyLCJzdWIiOiI1Yjk2YTBjZGMzYTM2ODU2NzkwM2Q4MTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vNJkjF6ot7s8UCmLgTYzOE4lCZp7NZ8rj6wGss8G2WQ",
      },
    }
  );
  console.log(res.json());
  return res.json();
};
