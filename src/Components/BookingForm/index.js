import React from 'react';

import styled from 'styled-components';

import Responsive from 'react-responsive';
import { Provider } from './Context';
import BookingFormMobileDrawer from './BookingFormMobileDrawer';
import CurrentBookingModule from './CurrentBookingModule';

const Mobile = props => <Responsive {...props} maxWidth={991} />
const Desktop = props => <Responsive {...props} minWidth={992} />
const MobileLandscape = props => <Responsive {...props} maxHeight={568} maxWidth={768} orientation={'landscape'} />

const BookingFormWrapper = styled.span`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: white;
  height: 540px;
  padding: 5px;
`

const BookingFormLandScapeWrapper = styled.span`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: white;
  height: 240px;
  padding: 5px;
`

export default (props) => {
  return (
    <Provider data={props.data}>
      <Desktop>
        <BookingFormWrapper>
          <CurrentBookingModule />
        </BookingFormWrapper>
      </Desktop>
      <Mobile>
        <BookingFormMobileDrawer>
          <BookingFormWrapper>
            <CurrentBookingModule />
          </BookingFormWrapper>
        </BookingFormMobileDrawer>
      </Mobile>
      <MobileLandscape>
        <BookingFormMobileDrawer>
          <BookingFormLandScapeWrapper>
            <CurrentBookingModule />
          </BookingFormLandScapeWrapper>
        </BookingFormMobileDrawer>
      </MobileLandscape>
    </Provider>
  );
}
