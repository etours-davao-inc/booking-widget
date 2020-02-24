import React, { useState } from 'react';
import Select from './SelectStyles';
import DatePicker from './DatePicker'

export default (props) => {
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

  },
}