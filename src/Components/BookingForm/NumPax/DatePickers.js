import React, { useState, useContext } from 'react';
import DatePicker from './DatePicker'
import { BookingContext } from '../Context';

export default (props) => {
  // const inititalState = {
  //   to: '',
  //   from: '',
  //   maxDays:,
  //   minDays:,
  //   nights:,
  //   hotelNights:,
  // }
  const ctx = useContext(BookingContext);
  const [dates, setDates] = useState({arrivalDate:'', departureDate:''})
  return (
    <>
      <div style={styles.dates}>
        <p className="p-0 m-0">Arrival date</p>
        <DatePicker minDate={new Date(2020, 1, 28)}/>
      </div>
      <div style={styles.dates, { marginBottom: '25px' }}>
        <p className="p-0 m-0">Departure date</p>
        <DatePicker />
      </div>
    </>
  )
}

const styles = {
  dates: {
    marginBottom: '15px'
  }
}