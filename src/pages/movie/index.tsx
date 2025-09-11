import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Grid,
  Loader,
  Segment,
  Image,
  List,
  Label,
  Header,
} from "semantic-ui-react";
import { fetchMovieDetails } from "../../services/tmdb";
import type { MovieDetails } from "../../types/tmdb";

export const Movie = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<MovieDetails>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id as string),
    enabled: !!id, // don't run if no id
  });

  // ! handle conditions
  if (!id) {
    return <div>Invalid Movie ID</div>;
  }

  if (isLoading) {
    return <Loader active />;
  }

  if (error) {
    return <div>Failed to load movie details</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  // ! If API fails or `data` is null/undefined → return error message
  if (!data) {
    return <div>Could not fetch movie details</div>;
  }

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        {/* ✅ Now we can use data safely because we already checked above */}
        <Header>{data.title}</Header>
        <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
          <Grid.Row>
            <Grid.Column width={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {/* Poster image */}
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                  size="medium"
                  centered
                />
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
                {/* Each field below is strongly typed because of MovieDetails */}
                <List.Item>
                  <List.Header>
                    Is The Movie For Adults:
                    {data.adult ? "Yes" : "No"}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Budget:
                    {data.budget}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Genres:
                    {data.genres.map((genre) => (
                      <Label key={genre.id}>{genre.name}</Label>
                    ))}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    IMDB ID:
                    {data.imdb_id}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Popularity:
                    {data.popularity}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Production Companies:
                    {data.production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Release Date:
                    {data.release_date}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Revenue:
                    {data.revenue}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Runtime:
                    {data.runtime}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Vote Average:
                    {data.vote_average}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Language:
                    {data.original_language}
                  </List.Header>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};
