import { Grid, Card } from "semantic-ui-react";
import { DisplayType } from "../../constants/display-types"; //

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
}

export const ColumnDisplay = ({ data, displayType }: Props) => {
  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
    >
      {data.map((displayData) => (
        <Grid.Column key={displayData.id}>
          <Card.Group>
            <Card
              fluid
              image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
              header={
                displayType === DisplayType.Movies
                  ? displayData.title
                  : displayData.name
              }
              meta={`Release Date: ${displayData.release_date} | Ratings: ${displayData.vote_average}`}
              description={displayData.overview.slice(0, 350) + "..."}
            />
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};
