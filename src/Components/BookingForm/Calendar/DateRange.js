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
              selectedDays={userInput.tourDates}
              disabledDays={{ before: disableDaysBefore}}
              onDayClick={(date) => actions.clickDayRange(date)} />
          </Calendar>
        )
      }}
    </Consumer>
  )
}
