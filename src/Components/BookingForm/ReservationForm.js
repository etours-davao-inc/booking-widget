import React, { useContext } from 'react';
import styled from 'styled-components';
import { ButtonGroup, Button } from './Buttons';
import { BookingContext } from './Context';

export default () => {
  const { userInput, RFValid, termsAccepted, actions } = useContext(BookingContext);

  return (
    <>
      <ReservationFormWrapper>
        <input type="text" name="name" placeholder="Name" value={userInput.name} required="required" onChange={e => actions.handleRFChange(e)} />
        <input type="email" name="email" placeholder="Email" value={userInput.email} required="required" onChange={e => actions.handleRFChange(e)} />
        <input type="text" name="contact" placeholder="Contact Number" value={userInput.contact} onChange={e => actions.handleRFChange(e)} />
        <textarea name="remarks" placeholder="Extra notes" value={userInput.remarks} rows={4} onChange={e => actions.handleRFChange(e)} />
        <div id="terms_and_conditions">
          <input id="terms_checkbox" name="terms" type="checkbox" required="required" checked={termsAccepted} onChange={e => actions.handleRFChange(e)} />
          <label htmlFor="terms_checkbox">Yes, I have read and agree with the terms and conditions below.</label>
        </div>
      </ReservationFormWrapper>
      <ButtonGroup>
        <Button next disabled={!RFValid} className="BookingFormButtons btn-next" onClick={() => actions.submitBooking()}>Submit</Button>
      </ButtonGroup>
    </>
  )
}

const ReservationFormWrapper = styled.form`
  font-size: 20px;
  input {
    margin-bottom: 12px;
    width: 100%;
    height: 36px;
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

  #terms_and_conditions input  {
    font-size: 1.2em;
    width: auto;   
    padding: 0;
    margin: 0 10px 0 0; 
  }
`