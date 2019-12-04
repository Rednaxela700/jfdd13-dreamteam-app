import firebase from "firebase";

export async function fetchTrips() {
  const dataSnapshot = await firebase.database().ref('/trips').once('value')
  const tripsFromFirebase = dataSnapshot.val()
  const trips = Object.entries(tripsFromFirebase).map(entry => {
    const [id, trip] = entry
    return {
      id,
      ...trip
    }
  })
  return trips
}

export async function addToFavorites(city, title, price) {
 const id =  await firebase.auth().currentUser.uid
 await firebase.database().ref(`/favorites/${id}`).push({
  city: this.city,
  title: this.title,
  price: this.price

  })
}

export async function fetchFromFavorites() {
  const id =  await firebase.auth().currentUser.uid
  const dataSnapshot = await firebase.database().ref(`/favorites/${id}`).once('value')
  const favoritesFromFirebase = dataSnapshot.val()
  const favs = Object.entries(favoritesFromFirebase).map(entry => {
    const [id, fav] = entry
    return {
      id,
      ...fav
    }
  })
  return favs
}