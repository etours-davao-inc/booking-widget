import React from 'react';
import ReactDOM from 'react-dom';
import BookingForm from './Components/BookingForm';

export default {
  mount: (data) => {
    ReactDOM.render(<BookingForm data={data} />, document.getElementById('bookingForm'));
  }
}
