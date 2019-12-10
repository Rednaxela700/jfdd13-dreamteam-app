import React from 'react';
import { Button, Divider, Form, Grid, Segment, Header } from 'semantic-ui-react'
// import Register from '../screens/Register';
// import React, { useState } from "react";
// import { login } from "../services/AuthService";

  

const DividerExampleVerticalForm = () => (
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Nazwa użytkownika'
            placeholder='Imię'
          />
          
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Stare hasło'
            placeholder='wpisz hasło'
            type='password'
          />
       
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Nowe hasło'
            placeholder='wpisz hasło'
            type='password'
          />

          <Button content='Login' primary />

        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button content='Sign up' icon='signup' size='big'/>
      </Grid.Column>
    </Grid>

    <Divider vertical></Divider>
  </Segment>
)

export default DividerExampleVerticalForm
import {Header} from "semantic-ui-react";
import firebase from "../firebase";

function UserPanel() {
    return (
        <div>
            <Header>dane z firebase dla usera {firebase.auth().currentUser.uid} </Header>
        </div>
    )
}

export default UserPanel;
