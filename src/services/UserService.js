import firebase from "firebase";

// const prepareUsers = data => Object.values(data);

// export const watchUsers = onSuccess => {
//   return firebase
//     .database()
//     .ref("/users")
//     .on("value", dataSnapshot => {
//       const users = dataSnapshot.val();
//       onSuccess(prepareUsers(users));
//     });
// };

// export const stopUsers = () => {
//   firebase
//     .database()
//     .ref("/users")
//     .off();
// };

export const prepareFavourites = data => {
  return Object.entries(data).map(arr => {
    // console.log(arr)
    const [id, data] = arr
    return {
      ...data,
      id
    }
  })
}

export const watchFavourites = onSuccess => {
  return firebase
    .database()
    .ref('/favorites')
    .on('value', dataSnapshot => {
      const favourites = dataSnapshot.val()
      console.log(favourites)
      onSuccess(prepareFavourites(favourites))
    })
}
export const unwatchFavourites = () => {
  return firebase
  .database()
  .ref('/favorites')
  .off()
}