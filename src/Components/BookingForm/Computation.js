import React from 'react';
import Currency from 'react-currency-formatter';

import styled from 'styled-components';

import { ButtonGroup, Button } from '../../../Buttons';
import ScrolledYWrapper from './ScrolledYWrapper';

import { Consumer } from './Context';

const ComputationWrapper = styled.section`
  .computationGrid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    grid-gap: 5px 5px;
    border-bottom: 1px dotted silver;
    font-size: .85em;
  }

  .computationGrid p {
    padding: 2px;
    margin: 0;
  }

  .computationGrid p:nth-child(3) {
    text-align: center;
  }

  .computationGrid p:nth-child(2), 
  .computationGrid p:nth-child(4) {
    text-align: right;
  }

  .computationTotalBalance {
    grid-column-start: 1;
    grid-column-end: 4;
  }    
`

export default () => {
  return (
    <Consumer>
      {({ data, userInput, calculations, actions }) => {
        return (
          <React.Fragment>
            <ScrolledYWrapper>
              <ComputationWrapper>
              <p className="m-0 py-3 font-weight-bold">View summary</p>
                <dl className="row small">
                  <dt className="col-sm-3">Name:</dt>
                  <dd className="col-sm-9">{data.name}</dd>
                  <dt className="col-sm-3">Duration:</dt>
                  <dd className="col-sm-9">{userInput.hotel ? `${userInput.tourDates.days} days and ${userInput.tourDates.nights} nights`: data.duration_text}</dd>
                </dl>
                <div id="summary_wrapper">
                  <div className="computationGrid">
                    <p></p><p>Price</p><p>Qty</p><p></p>
                  </div>
                  <div className="computationGrid">
                    <p>Adults</p>
                    <p><Currency quantity={calculations.item.adults} currency="PHP" pattern="!##,### " /></p>
                    <p>{userInput.adults[0]}</p>
                    <p><Currency quantity={calculations.total.adults} currency="PHP" pattern="!##,### " /></p>
                  </div>
                  <div className="computationGrid">
                    <p>Kids (0-2 yrs)</p>
                    <p><Currency quantity={calculations.item.kid02} currency="PHP" pattern="!##,### " /></p>
                    <p>{userInput.kid02[0]}</p>
                    <p><Currency quantity={calculations.total.kid02} currency="PHP" pattern="!##,### " /></p>
                  </div>
                  <div className="computationGrid">
                    <p>Kids (3-5 yrs)</p>
                    <p><Currency quantity={calculations.item.kid35} currency="PHP" pattern="!##,### " /></p>
                    <p>{userInput.kid35[0]}</p>
                    <p><Currency quantity={calculations.total.kid35} currency="PHP" pattern="!##,### " /></p>
                  </div>
                  <div className="computationGrid">
                    <p>Kids (6-11 yrs)</p>
                    <p><Currency quantity={calculations.item.kid611} currency="PHP" pattern="!##,### " /></p>
                    <p>{userInput.kid611[0]}</p>
                    <p><Currency quantity={calculations.total.kid611} currency="PHP" pattern="!##,### " /></p>
                  </div>
                  <div className="computationGrid">
                    <p className="computationTotalBalance">Total</p>
                    <p><Currency quantity={calculations.total.total} currency="PHP" pattern="!##,### " /></p>
                  </div>
                  <div className="computationGrid">
                    <p className="computationTotalBalance">Required downpayment to confirm your reservation</p>
                    <p><Currency quantity={calculations.total.downpayment} currency="PHP" pattern="!##,### " /></p>
                  </div>
                  <div className="computationGrid">
                    <p className="computationTotalBalance">Balance to be paid on the first day of your tour</p>
                    <p><Currency quantity={calculations.total.balance} currency="PHP" pattern="!##,### " /></p>
                  </div>
                </div>
              </ComputationWrapper>
            </ScrolledYWrapper>
            <ButtonGroup>
              <Button back className="BookingFormButtons btn-back" onClick={() => actions.step('-')}>Back</Button>
              <Button next className="BookingFormButtons btn-next" onClick={() => actions.step('+')}>Reservations</Button>
            </ButtonGroup>
          </React.Fragment>
        )


      }}
    </Consumer>

  )
}