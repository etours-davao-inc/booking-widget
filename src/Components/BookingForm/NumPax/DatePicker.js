import React, { useState } from 'react';
import Select from './SelectStyles';
import { format } from 'date-fns'

const DatePicker = ({minDate}) => {
  const initialDate = {
    month: minDate.getMonth(),
    day: minDate.getDate(),
    year: minDate.getFullYear(),
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
      return newDate;
    })
  }

  return (
    <div style={styles.datepicker}>
      <Select name="month" value={date.month} onChange={onChange}>
        {months.map((month, key) => <option disabled={key < initialDate.month && initialDate.year === date.year} value={key} key={key}>{month}</option> )}
      </Select>
      <Select name="day" value={date.day} onChange={onChange}>
        {[...Array(daysOfMonth).keys()].map(d => <option value={d+1} key={d+1} disabled={d < initialDate.day && initialDate.year === date.year}>{d+1}</option>)}
      </Select>
      <Select name="year" value={date.year} onChange={onChange}>
        {years.map(year => <option value={year} key={year}>{year}</option>)}
      </Select>
      <p>{format(new Date(date.year, date.month, date.day), 'MM/dd/yyyy')}</p>
    </div>
  )
}

DatePicker.defaultProps = { minDate: new Date() }

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
