import React, { useState } from 'react';
import { Container, Header, Card, Icon, Input } from "semantic-ui-react";
import defaultAvatar from '../assets/icon.svg'
import firebase from 'firebase'

function UserPanel({ data, avatarUrl, setAvatarUrl }) {
  const [changeAvatarVisible, setChangeAvatarVisible] = useState(false)
  const [selectedFile, setSelectedFile] = useState(false)
  const { email, name, date, bio, avatar, id } = data
  let processedDate
  if (date) {
    processedDate = new Date(date).toLocaleDateString()
  }

  const ImageOverlay = ({ children }) => {
    return <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: "#00000090" }}>
      {children}
    </div>
  }

  if (!id) {
    return null
  }

  return (
    <Container style={{ marginTop: '50px' }}>
      <Header>Your account</Header>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card>
          <Card.Content
            style={{ position: 'relative' }}
            onMouseEnter={() => { setChangeAvatarVisible(true) }}
            onMouseLeave={() => {
              if (selectedFile) return
              setTimeout(()=>{
                setChangeAvatarVisible(false)
              },5000)
            }}
          >
            <img
              src={(()=> avatarUrl || avatar || defaultAvatar)()}
              style={{maxWidth: '100%'}}
              alt="user profile img"
            />
            {
              changeAvatarVisible && <ImageOverlay>
                <Input
                  type="file"
                  name="userAvatarUrl"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={event => {
                    const file = event.target.files[0];
                    const fileExtension = file.name.slice(file.name.lastIndexOf("."))
                    if (file) {
                      const storageRef = firebase.storage().ref(`/users/${id}`);
                      const fileName = `avatar-${id}`
                      const fileRef = storageRef.child(fileName + fileExtension)
                      const uploadTask = fileRef.put(file)
                      uploadTask.on(
                        'state_changed',
                        () => { },
                        () => { },
                        () => {
                          uploadTask.snapshot.ref.getDownloadURL()
                          .then((downloadURL) => {
                            setAvatarUrl(downloadURL)
                            firebase.database().ref(`/users/${id}/avatar`).set(downloadURL)
                          }).then(()=> {
                            setSelectedFile(false)
                          });
                        })
                    }
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