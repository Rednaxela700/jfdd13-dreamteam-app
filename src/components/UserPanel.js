import React from 'react';
import { Header, Card, Icon } from "semantic-ui-react";

function UserPanel({ data }) {
  const { email, name, date } = data


  
  return (
    <div>
      <Header>dane z firebase dla {name} </Header>
      <p>email: {email}</p>

      <Card>
        <Card.Content header='Elliot Baker'/>
        <Card.Content meta='Friend'/>
        <Card.Content description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."/>
        <Card.Content extra>
          <div>
            <Icon name='user' />
            <span>Registered: {date}</span>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default UserPanel;