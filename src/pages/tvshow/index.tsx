import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Grid,
  Loader,
  Segment,
  Image,
  List,
  Label,
  Accordion,
  Card,
  Header,
} from "semantic-ui-react";
import { fetchTvShowDetails } from "../../services/tmdb";
import type { TvShowDetails } from "../../types/tmdb";

export const TvShow = () => {
  const { id } = useParams<{ id: string }>();
  const isIdValid = !!id;

  const { data, isLoading } = useQuery<TvShowDetails>({
    queryKey: ["tvShow", id], // ? include id in key
    queryFn: () => fetchTvShowDetails(id!),
    enabled: isIdValid, // ! only call if id exists
  });

  if (!id) {
    return <div>Invalid TV-Show ID</div>;
  }

  if (isLoading) {
    return <Loader active />;
  }

  const seasonsPanels = data?.seasons.map(
    (season: TvShowDetails["seasons"][0]) => ({
      key: season.id,
      title: `Season ${season.season_number}`,
      content: {
        content: (
          <Card
            style={{ height: "70px" }}
            meta={season.air_date}
            description={`${season.episode_count} episodes`}
          />
        ),
      },
    })
  );

  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header>{data?.name}</Header>
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
                    Created By:
                    <List.Description>
                      {data?.created_by
                        .map(
                          (creator: { id: number; name: string }) =>
                            creator.name
                        )
                        .join(", ")}
                    </List.Description>
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>Episodes Run Time:</List.Header>
                  {data?.episode_run_time.join(", ")}
                </List.Item>
                <List.Item>
                  <List.Header>
                    Genres:
                    {data?.genres.map((genre: { id: number; name: string }) => (
                      <Label key={genre.id}>{genre.name}</Label>
                    ))}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    First Air Date:
                    {data?.first_air_date}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    NetWorks:
                    {data?.networks.map(
                      (network: {
                        id: number;
                        name: string;
                        logo_path: string;
                      }) => (
                        <Image
                          key={network.id}
                          src={`https://image.tmdb.org/t/p/orginal/${network.logo_path}`}
                          size="small"
                          style={{ marginRight: 10 }}
                        />
                      )
                    )}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Production Companies:
                    {data?.production_companies
                      .map(
                        (company: { id: number; name: string }) => company.name
                      )
                      .join(", ")}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Number of Episodes:
                    {data?.number_of_episodes}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Number of Seasons:
                    {data?.number_of_seasons}
                  </List.Header>
                </List.Item>
                <List.Item>
                  <List.Header>Seasons:</List.Header>
                  <List.Description
                    style={{ height: "200px", overflowY: "scroll" }}
                  >
                    <Accordion
                      defaultActiveIndex={0}
                      panels={seasonsPanels}
                      styled
                    />
                  </List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Vote Average:
                    {data?.vote_average}
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
