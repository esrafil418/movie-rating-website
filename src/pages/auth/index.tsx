import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import { useMutation } from "@tanstack/react-query";
import { mutationLogin } from "./mutation";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: mutationLogin,
    onSuccess: (response) => {
      localStorage.setItem("guest_session_id", response.guest_session_id);
      navigate("/");
    },
  });

  const handleLogin = () => {
    mutate();
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="violet" textAlign="center">
          Welcome! Login as a Guest.
        </Header>
        <Form size="large">
          <Segment stacked>
            <Button
              type="button"
              color="violet"
              size="large"
              fluid
              onClick={handleLogin}
            >
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
