import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Grid, Loader, Segment, Image, List, Label } from "semantic-ui-react";
import { fetchMovieDetails } from "./query";

export const Movie = () => {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Invalid Movie ID</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });

  if (isLoading) {
    return <Loader active />;
  }

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
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
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                  size="medium"
                  centered
                />
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
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
                    {data.genres.map((genre: any) => (
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
                      .map((company: any) => company.name)
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
