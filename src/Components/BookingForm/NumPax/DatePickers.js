import React, { useState, useContext } from 'react';
import { addDays, differenceInCalendarDays, subDays, format } from 'date-fns';
import DatePicker from './DatePicker'
import { BookingContext } from '../Context';
import { resetDayRange } from 'tour-dates-utility';


export default ({data, plusMaxDays}) => {
  const ctx = useContext(BookingContext);
  const {duration, limitdays, startday, offsetnights} = data;
  const maxDays = limitdays ? duration: duration + plusMaxDays;
  const from = addDays(new Date(), startday);
  const to = addDays(from, duration-1);
  const inititalState = {
    from,
    to,
  }
  const [state, setState] = useState(inititalState)
  const [valid, setValid] = useState(true)
  const [error, setError] = useState('')

  const handleChange = date => {
    setState(currentState => {
      let newState = {...currentState, ...date }
      let days = differenceInCalendarDays(newState.to, newState.from) + 1;
      if (days <= maxDays && days >= duration ) {
        setValid(true)
        setError('')
        let nights = days - 1
        let hotelNights = nights - offsetnights
        return {...newState, days, nights, hotelNights}
      } else {
        setValid(false)
        setError(`Require minimum of ${duration} days and maximum of ${days} days`)
        return newState
      }
    })
  }

  return (
    <>
      <div style={styles.dates}>
        <p className="p-0 m-0">Arrival date</p>
        <DatePicker 
          startDate={from} 
          key={state.from} 
          minDate={state.from}
          valid={valid} 
          emitChange={(date) => handleChange({from: date})}
        />
      </div>
      <div style={styles.dates}>
        <p className="p-0 m-0">Departure date</p>
        <DatePicker 
          startDate={from} 
          key={state.to} 
          minDate={state.to}
          valid={valid}
          emitChange={(date) => handleChange({to:date})} 
        />
      </div>
      <p style={styles.error}>{error}</p>
    </>
  )
}

const styles = {
  dates: {
    marginBottom: '15px'
  },
  error: {
    color: 'red',
    fontSize: '12px',
    padding: 0,
    margin: 0,
  }
}