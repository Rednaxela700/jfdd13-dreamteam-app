import React, { useState } from 'react';
import { Container, Header, Card, Icon, Image, Input, Button } from "semantic-ui-react";
import defaultAvatar from '../assets/icon.svg'
import firebase from 'firebase'

function UserPanel({ data }) {
  const [changeAvatarVisible, setChangeAvatarVisible] = useState(false)
  const { email, name, date, bio, avatar } = data
  let processedDate
  if (date) {
    processedDate = new Date(date).toLocaleDateString()
  }

  const ImageOverlay = ({ children }) => {
    return <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: "#00000090" }}>
      {children}
    </div>
  }

  return (
    <Container style={{ marginTop: '50px' }}>
      <Header>Your account</Header>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card>
          <Card.Content
            style={{ position: 'relative' }}
            onMouseEnter={() => { setChangeAvatarVisible(true) }}
            onMouseLeave={() => { setChangeAvatarVisible(false) }}
          >
            <Image
              src={avatar ? avatar : defaultAvatar}
              wrapped
              ui={false} style={{}}
            />
            {
              changeAvatarVisible && <ImageOverlay>
                <Input
                  type="file"
                  name="userAvatarUrl"
                  accept=".jpg, .jpeg, .png"
                  onChange={event => {
                    const firstFile = event.target.files[0]
                    const storageRef = firebase.storage().ref('trips')
                    const fileName = 'avatar-' + new Date().toISOString()
                    const fileRef = storageRef.child(fileName + '.jpg')
                    const uploadTask = fileRef.put(firstFile)
                    uploadTask.on(
                      'state_changed',
                      () => { },
                      () => { },
                      () => {
                        uploadTask.snapshot.ref.getDownloadURL()
                      })
                  }}
                />
              </ImageOverlay>
            }
          </Card.Content>
          <Card.Content header={name} />
          <Card.Content meta={() => (
            <div style={{ color: '#000', cursor: 'pointer' }}>
              {email}
            </div>
          )} />
          {bio &&
            <Card.Content description={bio} />
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