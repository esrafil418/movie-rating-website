import { useState } from "react";
import { Container, Header, Loader, Menu, Segment } from "semantic-ui-react";
import { DisplayType } from "../../constants/display-types";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvShows } from "../../services/tmdb";
import { ColumnDisplay } from "../home/column-display";
import { Navigate } from "react-router-dom";

export const Rated = () => {
  // ? Read guest session id synchronously (this is safe and not a hook)
  const guestSessionId = localStorage.getItem("guest_session_id");

  const [activeTabs, setActiveTabs] = useState<DisplayType>(DisplayType.Movies);

  // ? Always call hooks in the same order. Use "enabled" to avoid running queries when no session id.
  const {
    data: ratedMovies,
    isLoading: isLoadingRatedMovies,
    isError: isErrorRatedMovies,
    error: ratedMoviesError,
  } = useQuery({
    queryKey: ["ratedMovies", guestSessionId],
    queryFn: fetchRatedMovies,
    enabled: !!guestSessionId, // ! only run when guestSessionId exists
  });

  const {
    data: ratedTvShows,
    isLoading: isLoadingRatedTvShows,
    isError: isErrorRatedTvShows,
    error: ratedTvShowsError,
  } = useQuery({
    queryKey: ["ratedTvShows", guestSessionId],
    queryFn: fetchRatedTvShows,
    enabled: !!guestSessionId,
  });

  // ! If user is not authenticated (no guest session) -> redirect to auth
  if (!guestSessionId) {
    return <Navigate to="/auth" />;
  }

  // ! Show loader while any enabled query is loading
  if (isLoadingRatedMovies || isLoadingRatedTvShows) {
    return <Loader active />;
  }

  // ! Show errors if any
  if (isErrorRatedMovies) {
    return (
      <div style={{ marginTop: 50 }}>
        Error loading rated movies: {`${ratedMoviesError}`}
      </div>
    );
  }
  if (isErrorRatedTvShows) {
    return (
      <div style={{ marginTop: 50 }}>
        Error loading rated TV shows: {`${ratedTvShowsError}`}
      </div>
    );
  }

  // ? Safely read results with optional chaining and fallback to empty array
  const movies = ratedMovies?.results || [];
  const tvShows = ratedTvShows?.results || [];

  return (
    <Container style={{ marginTop: 50 }}>
      <Menu pointing secondary>
        <Menu.Item
          name="Movies"
          active={activeTabs === DisplayType.Movies}
          onClick={() => setActiveTabs(DisplayType.Movies)}
        />

        <Menu.Item
          name="TV Shows"
          active={activeTabs === DisplayType.TvShows}
          onClick={() => setActiveTabs(DisplayType.TvShows)}
        />
      </Menu>

      <Segment>
        {activeTabs === DisplayType.Movies ? (
          <div>
            <Header as={"h2"}>Rated Movies</Header>
            <ColumnDisplay
              data={movies}
              displayType={DisplayType.Movies}
              isRated
            />
          </div>
        ) : (
          <div>
            <Header as={"h2"}>Rated TV Shows</Header>
            <ColumnDisplay
              data={tvShows}
              displayType={DisplayType.TvShows}
              isRated
            />
          </div>
        )}
      </Segment>
    </Container>
  );
};
