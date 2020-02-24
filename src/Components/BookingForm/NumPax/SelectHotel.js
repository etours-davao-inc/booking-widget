import React, { useState } from 'react';
import Select from './SelectStyles';

const SelectHotel = () => {
  return (
    <div style={{}}>
      <p className="p-0 m-0">Select Accommodation</p>
      <Select style={{ width: '100%' }}>
        <option>
          Tour Only
      </option>
        <option>
          Marco Polo hotel at 2500/night
      </option>
      </Select>
    </div>
  )
}

const style = {

}

export default SelectHotel;