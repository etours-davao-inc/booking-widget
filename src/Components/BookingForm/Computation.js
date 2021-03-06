import React, { useContext } from 'react';
import Currency from 'react-currency-formatter';
import styled from 'styled-components';
import { BookingContext } from './Context';
import { Animated } from "react-animated-css";

export default () => {
  const { data, userInput, calculations } = useContext(BookingContext);

  return (

    <ComputationWrapper>
      <h3 style={styles.h3}>Summary</h3>
      <p>Name: <strong>{data.name}</strong></p>
      <p>Duration: <strong>{data.hotels ? `${userInput.tourDates.days} days and ${userInput.tourDates.nights} 
      nights` : data.duration_text}</strong></p>
      <Animated key={calculations.total.total} animationOut="" isVisible={true} animateOnMount={true}>
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
          <div className="twoGrid">
            <p className="computationTotalBalance">Total</p>
            <p><Currency quantity={calculations.total.total} currency="PHP" pattern="!##,### " /></p>
          </div>
          <div className="twoGrid">
            <p className="computationTotalBalance">Required 50% downpayment</p>
            <p><Currency quantity={calculations.total.downpayment} currency="PHP" pattern="!##,### " /></p>
          </div>
          <div className="twoGrid">
            <p className="computationTotalBalance">Balance due on the first day of your tour</p>
            <p><Currency quantity={calculations.total.balance} currency="PHP" pattern="!##,### " /></p>
          </div>
          <div className="twoGrid">
            <p>Option date for downpayment</p>
            <p style={{ textAlign: 'right' }}><strong><small>{userInput.optionDate}</small></strong></p>
          </div>
        </div>
      </Animated>
    </ComputationWrapper>
  )
}

const styles = {
  h3: {
    color: '#d35400',
    fontSize: '17px'
  }
}

const ComputationWrapper = styled.section`
  font-size: 14px;
  
  @media (min-width: 768px) {  
  font-size:16px;
  }

  .computationGrid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    grid-gap: 5px 5px;
    border-bottom: 1px dotted silver;
  }

  .twoGrid:last-child {
    border-bottom: none;
  }

  .twoGrid p:last-child {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
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

  .twoGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;	
    border-bottom: 1px dotted silver;
  }

  .twoGrid p {
    padding: 4px;
    margin: 0;
  }

  .twoGrid p:last-child {
    text-align: right;
  }
`