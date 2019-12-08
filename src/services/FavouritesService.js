import firebase from "firebase";

const prepareFavourites = data => {
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