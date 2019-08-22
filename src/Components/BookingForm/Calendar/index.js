import React from 'react';
import Calendar from './Calendar';

import DayPicker from 'react-day-picker';

import { Consumer } from '../Context';

export default () => {
  return (
    <Consumer>
      {({ userInput, disableDaysBefore, actions }) => {
        return (
          <Calendar>
            <DayPicker
              showOutsideDays
              fixedWeeks={true}
              selectedDays={userInput.tourDate}
              disabledDays={{ before: disableDaysBefore }}
              onDayClick={(date) => actions.clickNewDate(date)} />
          </Calendar>
        )
      }}
    </Consumer>
  )

}