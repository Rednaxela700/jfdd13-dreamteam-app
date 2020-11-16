import React from 'react'
import { Redirect } from "react-router-dom";
import firebase from "../firebase";

export async function login(email, password) {
  try {
    const req = await firebase.auth().signInWithEmailAndPassword(email, password);
    return req

  } catch (error) {

    throw error;
  }
}

export const passwordReset = email => {
  return firebase.auth().sendPasswordResetEmail(email);
};

export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().languageCode = "pl";
  provider.setCustomParameters({
    login_hint: "user@example.com"
  });
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const user = result.user;
      const database = firebase.database()

      database.ref('/users/' + user.uid).once('value')
        .then((snapshot)=> {
          const response = snapshot.val() || null
          if(!!response) {
            const database = firebase.database()
            database.ref(`/users/${user.uid}/`).set({
              name: user.displayName,
              email: user.email,
              date: Date.now()
            })
          } else {
            return user.uid
          }
        })

    })
};
export async function getUserByUID(uid) {
  return await firebase.database().ref().child(`/users/${uid}`).once('value');
}

export const getUserData = async (id) => {
  const req = await getUserByUID(id)
  return req.val();
}

export const signOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => (<Redirect to="/"/>));
};

export const register = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(value => {
      const user = firebase.auth().currentUser;
      const id = user.uid
      user
        .updateProfile({
          displayName: email
        })
        .then(() => {
          firebase
            .database()
            .ref(`/users/${id}`)
            .set({
              name: "",
              email,
              date: Date.now()
            })
        });
    })
    .catch((error => {
      throw error
    }))
};
