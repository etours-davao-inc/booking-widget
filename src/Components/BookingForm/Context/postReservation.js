import { sendReservation } from 'firebase-etours-booking-crud';

export default (payload) => {
  try {
    sendReservation(payload)
  } catch {
    console.log("Error while posting to FB Database")
  }
}

