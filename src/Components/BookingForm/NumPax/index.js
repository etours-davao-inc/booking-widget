import React, { useContext } from 'react';
import PaxSection from './PaxSection';
import DatePickers from './DatePickers';
import { BookingContext } from '../Context';
import SelectHotel from './SelectHotel';
import Computation from '../Computation';
import ReservationForm from '../ReservationForm';

export default () => {
  const { actions, data, calculations, userInput } = useContext(BookingContext);
  return (
    <>
      <p className="m-0 py-3 font-weight-bold">Select number of persons</p>
      <div style={styles.section}>
        <PaxSection title="Adult" type="adults"></PaxSection>
        <PaxSection title="Child (0-2 yrs)" type="kid02"></PaxSection>
        <PaxSection title="Child (3-5 yrs)" type="kid35"></PaxSection>
        <PaxSection title="Child (6-11 yrs)" type="kid611"></PaxSection>
      </div>
      <p className="m-0 py-3 font-weight-bold">Select tour date</p>
      <DatePickers data={data} plusMaxDays={2} /> 
      <SelectHotel hotels={data.hotels} />

      <div style={{height:'25px', borderBottom: '3px dotted silver'}}></div>
      <Computation />

      <div style={{height:'25px', borderBottom: '3px dotted silver'}}></div>
      <ReservationForm />
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

