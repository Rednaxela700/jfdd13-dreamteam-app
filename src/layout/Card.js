import React, { useState, useRef } from 'react'
import { signout } from "../services/AuthService";
import defaultAvatar from '../assets/userMock.png'
import CardIcon from '../assets//cardIcon.svg'
import { Link } from 'react-router-dom';
import firebase from 'firebase'



export default function Card({ userData, avatarUrl, setAvatarUrl }) {
  const [selectedFile, setSelectedFile] = useState(false)
  const { avatar, date, id } = userData
  const handleAvatarChange = event => {
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
            }).then(() => {
              setSelectedFile(false)
            });
        })
    }
  }
  const FileUploader = () => {
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
      hiddenFileInput.current.click();
    };
    return (
      <>
        <button
          onClick={handleClick}
          className="card__avatar--change"
        >
          <img src={CardIcon} alt="" />
        </button>
        <input type="file"
          ref={hiddenFileInput}
          className="input--hidden"
          onChange={handleAvatarChange}
          name="userAvatar"
        />
      </>
    );
  };
  return (
    <div className="card">
      <figure className="card__avatar">
        <img
          src={(() => avatarUrl || avatar || defaultAvatar)()}
          alt=""
          className="avatar__img"
        />
        <figcaption className="avatar__input__container">
          <FileUploader />
        </figcaption>
      </figure>
      <p className="card__avatar__name">
        {userData.name || "Hello there"}
      </p>
      <nav className="nav">
        <ul className="nav__container">
          <li>
            <Link to="/" className="nav__link">Favourites</Link>
          </li>
          <li>
            <Link to="/" className="nav__link">Your trips</Link>
          </li>
          <li>
            <Link to="/" className="nav__link">Bio</Link>
          </li>
          <li>
            <button
              onClick={() => signout()}
            >
              Sign out
              </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
