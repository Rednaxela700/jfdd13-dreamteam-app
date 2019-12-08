import React from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import { signout } from '../services/AuthService'

const LoggedUser = () => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Witaj
        </Header>
        <Button
          onClick={() => signout()
        }
          color="teal"
          fluid
          size="large"
          >
          Wyloguj
        </Button>
      </Grid.Column>
    </Grid>
  );
};




export default LoggedUser;
