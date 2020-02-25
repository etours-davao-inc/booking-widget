import React, { useState } from 'react';
import Select from './SelectStyles';
import { format } from 'date-fns'

const DatePicker = ({startDate, minDate, emitChange, valid}) => {
  const initialDate = {
    month: minDate.getMonth(),
    day: minDate.getDate(),
    year: minDate.getFullYear(),
  }

  const startingDate = {
    month: startDate.getMonth(),
    day: startDate.getDate(),
    year: startDate.getFullYear(),
  }

  const [date, setDate] = useState(initialDate);
  const [daysOfMonth, setDaysOfMonth] = useState(new Date(date.year, date.month+1, 0).getDate());

  const onChange = ({target}) => {
    setDate(currentDate => {
      let newDate = {...currentDate, [target.name]: Number(target.value)};
      if (target.name !== 'day') {
        let monthDays = new Date(newDate.year, newDate.month+1, 0).getDate()
        if (newDate.day > monthDays) newDate.day = monthDays;
        setDaysOfMonth(monthDays);
      }
      emitChange(new Date(newDate.year, newDate.month, newDate.day));
      return newDate;
    })
  }

  return (
    <div style={styles.datepicker}>
      <Select name="month" value={date.month} valid={valid} onChange={onChange}>
        {months.map((month, key) => {
          let disable = key < startingDate.month && startingDate.year === date.year
          return <option value={key} key={key} disabled={disable}>{month}</option> 
        })}
      </Select>
      <Select name="day" value={date.day} valid={valid} onChange={onChange}>
        {[...Array(daysOfMonth).keys()].map(day => {
          let value = day + 1;
          let disable = value < startingDate.day && startingDate.year === date.year && startingDate.month === date.month
          return <option value={value} key={value} disabled={disable}>{value}</option>
        })}
      </Select>
      <Select name="year" value={date.year} valid={valid} onChange={onChange}>
        {years.map(year => <option value={year} key={year}>{year}</option>)}
      </Select>
      {/* <p>{format(new Date(date.year, date.month, date.day), 'MM/dd/yyyy')}</p> */}
    </div>
  )
}

DatePicker.defaultProps = { 
  minDate: new Date(),
  startDate: new Date(2019, 11, 31),
  valid:true,
  emitChange: () => console.log(new Date()) 
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
const years = [2020, 2021]

const styles = {
  datepicker: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 2fr',
    gridGap: '15px',
  }
}

export default DatePicker;
