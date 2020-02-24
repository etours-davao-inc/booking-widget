import React, { useState } from 'react';
import Select from './SelectStyles';

export default (props) => {

  return (
    <>
      <div style={styles.dates}>
        <p className="p-0 m-0">Arrival date</p>
        <div style={styles.datepicker}>
          <Select>
            <option>January</option>
          </Select>
          <Select>
            <option>31</option>
          </Select>
          <Select>
            <option>2027</option>
          </Select>
        </div>
      </div>
      <div style={styles.dates, { marginBottom: '25px' }}>
        <p className="p-0 m-0">Departure date</p>
        <div style={styles.datepicker}>
          <Select>
            <option>January</option>
          </Select>
          <Select>
            <option>31</option>
          </Select>
          <Select>
            <option>2027</option>
          </Select>
        </div>
      </div>
    </>
  )
}

const styles = {
  dates: {
    marginBottom: '15px'

  },
  datepicker: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 2fr',
    gridGap: '15px',
  }
}