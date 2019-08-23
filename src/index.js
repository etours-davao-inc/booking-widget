import React from 'react';
import ReactDOM from 'react-dom';
import BookingForm from './Components/BookingForm';

export default {
  mount: (data) => {
    const bookingFormWrapper = document.getElementById('bookingForm');
    bookingFormWrapper.innerHTML = ""
    ReactDOM.render(<BookingForm data={data} />, bookingFormWrapper);
  }
}
