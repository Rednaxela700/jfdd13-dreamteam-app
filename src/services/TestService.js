import firebase from "../firebase";

export async function sendTest (test) {  
  try{
    await firebase.database().ref("/test").set({test})
    console.log("test wysłany!");  
  } catch (error) {
    console.log("test nie został wysłany");
  }
 };
  
const prepareTrips = data => {
  return Object.entries(data).map(arr => {
    const [id, value] = arr;
    return {
      id,
      ...value
    };
  });
};