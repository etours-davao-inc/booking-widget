import React, { useContext } from 'react';
import styled from 'styled-components';
import { BookingContext } from './Context';

export default () => {
  const { userInput, RFValid, termsAccepted, actions } = useContext(BookingContext);

  return (
    <>
      <h3>Reservation Form</h3>
      <ReservationFormWrapper onSubmit={(e) => actions.submitBooking(e)}>
        <input type="text" name="name" placeholder="Name" value={userInput.name} required="required" onChange={e => actions.handleRFChange(e)} aria-label="name" />
        <input type="email" name="email" placeholder="Email" value={userInput.email} required="required" onChange={e => actions.handleRFChange(e)} aria-label="email address" />
        <input type="text" name="contact" placeholder="Contact Number" value={userInput.contact} onChange={e => actions.handleRFChange(e)} aria-label="contact number" />
        <textarea name="remarks" placeholder="Extra notes" value={userInput.remarks} rows={4} onChange={e => actions.handleRFChange(e)} aria-label="other remarks" />
        <div id="terms_and_conditions">
          <input id="terms_checkbox" name="terms" type="checkbox" required="required" checked={termsAccepted} onChange={e => actions.handleRFChange(e)} />
          <label htmlFor="terms_checkbox">I have read and agree with the terms and conditions above.</label>
        </div>
        {RFValid &&
          <input type="submit" value="Submit Reservation" className="submit" />
        }
      </ReservationFormWrapper>
    </>
  )
}

const ReservationFormWrapper = styled.form`
  padding: 10px;
  font-size: 16px;
  input {
    margin-bottom: 12px;
    width: 100%;
    height: 46px;
    border-radius: 2px;
    border: 1px solid rgba(149, 165, 166,1.0);
    padding: 0 12px;
  }

  textarea {
    margin-bottom: 10px;
    width: 100%;
    border-radius: 2px;
    border: 1px solid rgba(149, 165, 166,1.0);
    padding: 10px;   
  }

  #terms_and_conditions {
    display: inline-flex;
    align-items: center;
  }

  #terms_and_conditions input[type=checkbox]  {
    align-self: top;
    transform: scale(2.5);
    width: auto;   
    padding: 0;
    margin: 0 15px 0 10px; 
    background-color: white;
  }
  .submit {
    flex-grow: 1;
    border-radius: 2px;
    padding: 8px;
    background-color: #2ecc71;
    color: white;
    border: none; 
  }
`