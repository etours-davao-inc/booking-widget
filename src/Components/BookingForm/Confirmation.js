import React from 'react';

import { Consumer } from './Context';

import { ButtonGroup, Button } from '../../../Buttons';
import ScrolledYWrapper from './ScrolledYWrapper';

const Confirmation = () => {
  return (
    <Consumer>
      {({actions}) => {
        return (
          <React.Fragment>
            <ScrolledYWrapper>
              <p style={{fontSize:'5em', padding:'50px', color:'#2ecc71', textAlign: 'center', width:'100%'}} className="fa fa-thumbs-up"></p> 
              <p style={{padding:'10px', color:'gray', textAlign: 'center', width:'100%'}}className="h1">Your booking request has been sent.</p>
            </ScrolledYWrapper>
            <ButtonGroup>
              <Button next onClick={()=>actions.resetBookingForm()}>Done</Button>
            </ButtonGroup>
          </React.Fragment>
        )
      }}
    </Consumer>
  )
}

export default Confirmation;