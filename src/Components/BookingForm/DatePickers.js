import React, { useState, useContext } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import DatePicker from './DatePicker'
import { BookingContext } from './Context';

export default ({data, plusMaxDays}) => {
  const { actions, userInput } = useContext(BookingContext);
  const { duration, limitdays, offsetnights } = data;
  const maxDays = limitdays ? duration: duration + plusMaxDays;

  const [state, setState] = useState(userInput.tourDates)
  const [valid, setValid] = useState(true)

  const handleChange = date => {
    setState(currentState => {
      let newState = {...currentState, ...date }
      let days = differenceInCalendarDays(newState.to, newState.from) + 1;
      if (days <= maxDays && days >= duration ) {
        setValid(true)
        let nights = days - 1
        let hotelNights = nights - offsetnights
        newState =  {...newState, days, nights, hotelNights, offsetnights};
        actions.onSelectDates(newState)
        return newState
      } else {
        setValid(false);
        actions.setInvalidDates();
        return newState
      }
    })
  }

  return (
    <div>
      <div style={styles.dates}>
        <label htmlFor="from" style={{fontSize: '15px', margin: '0 auto'}}>Arrival date</label>
        <DatePicker
          id="from"
          startDate={userInput.startDate}
          key={state.from} 
          minDate={state.from}
          valid={valid} 
          emitChange={(date) => handleChange({from: date})}
          aria-describeby="dates-notes"
        />
      </div>
      <div style={styles.dates}>
        <label htmlFor="to" style={{fontSize: '15px', margin: '0 auto'}}>Departure date</label>
        <DatePicker 
          id="to"
          startDate={userInput.startDate}
          key={state.to} 
          minDate={state.to}
          valid={valid}
          emitChange={(date) => handleChange({to:date})}
          aria-describeby="dates-notes"
        />
      </div>
      <p 
        style={valid ? styles.dateNotes : {...styles.dateNotes, ...styles.error}} 
        id="dates-notes"
      >
        Travel dates requires a minimum of {duration} days and maximum of {state.days} from arrival date to departure date
      </p>
    </div>
  )
}

const styles = {

  dates: {
    margin: '0 0 15px 0'
  },
  error: {
    color: '#d35400',
  },
  dateNotes: {
    fontSize: '14px',
    margin: 0,
    padding: 0,
    lineHeight: '16px',
  }
}