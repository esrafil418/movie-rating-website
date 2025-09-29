import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Loader,
  Segment,
  Image,
  List,
  Label,
  Header,
  Button,
} from "semantic-ui-react";
import { fetchMovieDetails } from "../../services/tmdb";
import { useRate } from "../../hooks/useRate";
import type { MovieDetails } from "../../types/tmdb";

export const Movie = () => {
  const { id } = useParams<{ id: string }>();
  const guestSessionId = localStorage.getItem("guest_session_id");

  const { data, isLoading } = useQuery<MovieDetails>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id!),
    enabled: !!id,
  });

  const rateMutation = useRate();
  const [isMutating, setIsMutating] = useState(false);

  const handleRate = (value: number) => {
    if (!guestSessionId || !id) return alert("Please login first!");
    setIsMutating(true);
    rateMutation.mutate(
      { id, value, guestSessionId, type: "movie" },
      {
        onSettled: () => setIsMutating(false),
        onError: () => setIsMutating(false),
      }
    );
  };

  if (!id) return <div>Invalid Movie ID</div>;
  if (isLoading) return <Loader active />;

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header>{data?.title}</Header>
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
                  src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                  size="medium"
                  centered
                />
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
                <List.Item>
                  <List.Header>
                    Genres:{" "}
                    {data?.genres.map((genre) => (
                      <Label key={genre.id}>{genre.name}</Label>
                    ))}
                  </List.Header>
                </List.Item>
              </List>

              <div style={{ marginTop: 20 }}>
                <Header as="h4">Rate this movie:</Header>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
                    <Button
                      key={v}
                      color="violet"
                      size="small"
                      disabled={isMutating}
                      onClick={() => handleRate(v)}
                    >
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};
