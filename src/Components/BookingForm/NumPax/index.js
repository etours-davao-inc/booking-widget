import React from 'react';
import PaxSection from './PaxSection';

import { ButtonGroup, Button } from '../../../../Buttons';
import ScrolledYWrapper from '../ScrolledYWrapper';

import { Consumer } from '../Context';

export default () => {
  return (
    <React.Fragment>
      <ScrolledYWrapper>
        <p className="m-0 py-3 font-weight-bold">Select number of persons</p>
        <PaxSection title="Adults" type="adults"></PaxSection>
        <PaxSection title="Kids 0-2 yrs old" type="kid02"></PaxSection>
        <PaxSection title="Kids 3-5 yrs old" type="kid35"></PaxSection>
        <PaxSection title="Kids 6-11 yrs old" type="kid611"></PaxSection>
      </ScrolledYWrapper>
      <Consumer>
        { ({actions}) => {
          return (
            <ButtonGroup>
              <Button next onClick={()=>actions.step('+')}>Select tour date</Button>
            </ButtonGroup>
          )
        } }
      </Consumer>  

    </React.Fragment>
  )
};