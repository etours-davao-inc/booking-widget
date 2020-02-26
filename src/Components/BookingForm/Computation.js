import React, { useContext } from 'react';
import Currency from 'react-currency-formatter';
import styled from 'styled-components';
import { BookingContext } from './Context';
import { format } from 'date-fns'

export default () => {
  const { data, userInput, calculations } = useContext(BookingContext);
  let optionDate = userInput.optionDate ? format(userInput.optionDate, 'MMMM d, yyyy') : format(new Date(), 'MMMM d, yyyy')
  return (
    <ComputationWrapper>
      <h3 className="m-0 py-3 font-weight-bold">Summary</h3>
      <p style={{ marginBottom: '3px' }}>Name: <strong>{data.name}</strong></p>
      <p>Duration: <strong>{data.hotels ? `${userInput.tourDates.days} days and ${userInput.tourDates.nights} nights` : data.duration_text}</strong></p>
      <div id="summary_wrapper">
        <div className="computationGrid">
          <p></p><p>Price</p><p>Qty</p><p>Total</p>
        </div>
        <div className="computationGrid">
          <p>Adults</p>
          <p><Currency quantity={calculations.item.adults} currency="PHP" pattern="!##,### " /></p>
          <p>{userInput.adults[0]}</p>
          <p><Currency quantity={calculations.total.adults} currency="PHP" pattern="!##,### " /></p>
        </div>
        {userInput.kid611[0] != '0' &&
          <div className="computationGrid">
            <p>Kids (6-11 yrs)</p>
            <p><Currency quantity={calculations.item.kid611} currency="PHP" pattern="!##,### " /></p>
            <p>{userInput.kid611[0]}</p>
            <p><Currency quantity={calculations.total.kid611} currency="PHP" pattern="!##,### " /></p>
          </div>
        }
        {userInput.kid35[0] != '0' &&
          <div className="computationGrid">
            <p>Kids (3-5 yrs)</p>
            <p><Currency quantity={calculations.item.kid35} currency="PHP" pattern="!##,### " /></p>
            <p>{userInput.kid35[0]}</p>
            <p><Currency quantity={calculations.total.kid35} currency="PHP" pattern="!##,### " /></p>
          </div>
        }
        {userInput.kid02[0] != '0' &&
          <div className="computationGrid">
            <p>Kids (0-2 yrs)</p>
            <p><Currency quantity={calculations.item.kid02} currency="PHP" pattern="!##,### " /></p>
            <p>{userInput.kid02[0]}</p>
            <p><Currency quantity={calculations.total.kid02} currency="PHP" pattern="!##,### " /></p>
          </div>
        }
        <div className="computationGrid">
          <p className="computationTotalBalance">Total</p>
          <p><Currency quantity={calculations.total.total} currency="PHP" pattern="!##,### " /></p>
        </div>
        <div className="computationGrid">
          <p className="computationTotalBalance">Required downpayment on or before <strong>{optionDate}</strong> to confirm your reservation</p>
          <p><Currency quantity={calculations.total.downpayment} currency="PHP" pattern="!##,### " /></p>
        </div>
        <div className="computationGrid">
          <p className="computationTotalBalance">Balance to be paid on the first day of your tour</p>
          <p><Currency quantity={calculations.total.balance} currency="PHP" pattern="!##,### " /></p>
        </div>
      </div>
    </ComputationWrapper>
  )
}

const ComputationWrapper = styled.section`
  font-size: 18px;
  .computationGrid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    grid-gap: 5px 5px;
    border-bottom: 1px dotted silver;
    font-size: 1em;
  }

  .computationGrid:last-child {
    border-bottom: none;
  }

  .computationGrid p {
    padding: 4px;
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