import React from 'react';
import { Container, Header, Card, Icon, Image } from "semantic-ui-react";
import defaultAvatar from '../assets/icon.svg'

function UserPanel({ data }) {

  const { email, name, date, bio } = data
  let processedDate
  if (date) {
    processedDate = new Date(date).toLocaleDateString()
  }

  return (
    <Container style={{ marginTop: '50px' }}>
      <Header>Your account</Header>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card>
          <Image src={defaultAvatar} wrapped ui={false} style={{}} />
          <Card.Content header={name} />
          <Card.Content meta={() => (
            <div style={{ color: '#000', cursor: 'pointer' }}>
              {email}
            </div>
          )} />
          {bio &&
            <Card.Content description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat." />
          }
          {processedDate && <Card.Content extra>
            <div>
              <Icon name='calendar alternate outline' />
              <span>Registered: {processedDate}</span>
            </div>
          </Card.Content>
          }
        </Card>
      </div>
    </Container>
  )
}

export default UserPanel;