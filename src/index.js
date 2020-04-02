import React from 'react';
import ReactDOM from 'react-dom';
import PriceWidget from './Components/BookingForm';

export default {
  mount: data => {
    const bookingFormWrapper = document.getElementById('pricewidget');
    bookingFormWrapper.innerHTML = '';
    ReactDOM.render(<PriceWidget data={data} />, bookingFormWrapper);
  }
};
