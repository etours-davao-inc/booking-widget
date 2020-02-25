import React, { useState, useContext } from 'react';
import Select from './SelectStyles';
import { BookingContext } from './Context';

const SelectHotel = ({ hotels }) => {
  const { actions } = useContext(BookingContext)
  return (
    <div style={{}}>
      <p className="p-0 m-0">Select Accommodation</p>
      <Select style={styles.select} onChange={(e) => actions.onSelectHotel(e.target.value)}>
        <option value={""} key={0}>Tour Only</option>
        {hotels.map(({code, name, price}) => <option key={code} value={code}>{name.toLowerCase()}</option>)}
      </Select>
    </div>
  )
}

const styles = {
  select: {
    width: '100%',
    textTransform: 'capitalize',
  }
}

export default SelectHotel;