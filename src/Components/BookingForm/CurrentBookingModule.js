import React from 'react';

import NumPax from './NumPax';
import Calendar from './Calendar';
import DateRange from './Calendar/DateRange';
import Hotels from './Hotels';
import Computation from './Computation';
import ReservationForm from './ReservationForm';
import Confirmation from './Confirmation';

import { Consumer } from './Context';

export default () => {
  return (
    <Consumer>
      { ({ currentModule }) => {
        switch(currentModule) {
          case 'NumPax':
            return <NumPax />
          case 'Calendar':
            return <Calendar />
          case 'DateRange':
            return <DateRange />
          case 'Hotels':
            return <Hotels />  
          case 'Computation':
            return <Computation />
          case 'Reservation':
            return <ReservationForm />
          case 'Confirmation':
            return <Confirmation />
          default:
            return <NumPax />
        }        
      }}
    </Consumer>
  )
}