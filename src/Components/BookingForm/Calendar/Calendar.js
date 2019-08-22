import React from 'react';

import { ButtonGroup, Button } from '../../../../Buttons';
import CalendarWrapper from './CalendarWrapper';
import ScrolledYWrapper from '../ScrolledYWrapper';

import { Consumer } from '../Context';

export default (props) => {
  return (
    <Consumer>
      {({ data, isRange, actions }) => {
        let valid = data.type != 'multiday' ? false : !isRange
        console.log(valid)
        return (
          <React.Fragment>
            <ScrolledYWrapper>
              <p className="m-0 py-3 font-weight-bold">Choose tour date</p>
              <CalendarWrapper>
                {props.children}
              </CalendarWrapper>
            </ScrolledYWrapper>
            <ButtonGroup>
              <Button back className="BookingFormButtons btn-back" onClick={() => actions.step('-')}>Back</Button>
              <Button next disabled={valid} className="BookingFormButtons btn-next" onClick={() => actions.step('+')}>View computations</Button>
            </ButtonGroup>
          </React.Fragment>
        )
      }}
    </Consumer>
  )
} 