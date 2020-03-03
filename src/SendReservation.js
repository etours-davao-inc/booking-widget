import * as firebase from 'firebase/app';

import "firebase/firestore";

import { dbName, fireBaseConfig } from '../config';

firebase.initializeApp(fireBaseConfig);

const db = firebase.firestore().collection(dbName)

export const SendReservation = payload => db.add(payload).then(bookingID => {
  return bookingID;
}).catch( (error) => {
  throw new error("Booking posting problem");
})