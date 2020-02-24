import React, { useState } from 'react';
import Select from './SelectStyles';

const SelectHotel = ({ hotels }) => {
  return (
    <div style={{}}>
      <p className="p-0 m-0">Select Accommodation</p>
      <Select style={styles.select}>
        <option value={'tour-only'} key={0}>Tour Only</option>
        {hotels.map(({code, name, price}) => <option key={code} value={code}>{`${name.toLowerCase()} at Php ${price}`}</option>)}
      </Select>
    </div>
  )
}

const styles = {
  select: {
    width: '100%',
    textTransform: 'capitalize'
  }
}

export default SelectHotel;