import { useState } from "react";
import { Button } from "semantic-ui-react";
import { ColumnDisplay } from "./column-display";
import { fetchMovies, fetchTvShows } from "../../services/tmdb";
import { useQuery } from "@tanstack/react-query";
import { DisplayType } from "../../constants/display-types";
import { Link } from "react-router-dom";

export const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );

  const {
    data: movieData,
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
    error: movieError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const {
    data: tvShowData,
    isLoading: isLoadingTvShows,
    isError: isErrorTvShows,
    error: tvShowError,
  } = useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchTvShows,
  });

  if (isLoadingMovies || isLoadingTvShows) {
    return <div style={{ margin: 50 }}>Loading...</div>;
  }

  if (isErrorMovies) {
    return (
      <div style={{ margin: 50 }}>Error loading movies: {`${movieError}`}</div>
    );
  }

  if (isErrorTvShows) {
    return (
      <div style={{ margin: 50 }}>
        Error loading TV shows: {`${tvShowError}`}
      </div>
    );
  }

  const movies = movieData?.results || [];
  const tvShows = tvShowData?.results || [];

  const isGuest = localStorage.getItem("guest_session_id") === null;

  return (
    <div style={{ margin: 50, height: "auto" }}>
      {isGuest && (
        <div style={{ marginBottom: 12 }}>
          You are not logged in. <Link to="/auth">Login as guest</Link> to rate
          items.
        </div>
      )}
      <Button.Group>
        <Button
          color={displayType === DisplayType.Movies ? "blue" : undefined}
          onClick={() => setDisplayType(DisplayType.Movies)}
        >
          Movies
        </Button>
        <Button
          color={displayType === DisplayType.TvShows ? "blue" : undefined}
          onClick={() => setDisplayType(DisplayType.TvShows)}
        >
          TV Shows
        </Button>
      </Button.Group>

      <div style={{ marginTop: 20 }}>
        {displayType === DisplayType.Movies ? (
          <ColumnDisplay data={movies} displayType={DisplayType.Movies} />
        ) : (
          <ColumnDisplay data={tvShows} displayType={DisplayType.TvShows} />
        )}
      </div>
    </div>
  );
};
