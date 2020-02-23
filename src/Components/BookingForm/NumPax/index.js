import React, { useContext } from 'react';
import PaxSection from './PaxSection';
import { ButtonGroup, Button } from '../../Buttons';
import { BookingContext } from '../Context';

export default () => {
  const { actions } = useContext(BookingContext);
  return (
    <>
      <p className="m-0 py-3 font-weight-bold">Select number of persons</p>
      <div style={styles.section}>
        <PaxSection title="Adult" type="adults"></PaxSection>
        <PaxSection title="Child (0-2 yrs)" type="kid02"></PaxSection>
        <PaxSection title="Child (3-5 yrs)" type="kid35"></PaxSection>
        <PaxSection title="Child (6-11 yrs)" type="kid611"></PaxSection>
      </div>
      <ButtonGroup>
        <Button next onClick={() => actions.step('+')}>Select tour date</Button>
      </ButtonGroup>
    </>
  )
};

const styles = {
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px'

  }
}

