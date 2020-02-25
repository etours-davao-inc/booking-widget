import React, { useContext } from 'react';
import PaxSection from './PaxSection';
import DatePickers from './DatePickers';
import { BookingContext } from './Context';
import SelectHotel from './SelectHotel';
import Computation from './Computation';
import ReservationForm from './ReservationForm';
import Hotel from './Hotel';

export default () => {
  const { data, userInput } = useContext(BookingContext);
  return (
    <>
      <div style={styles.wrapper}>
        <h3 className="m-0 py-3 font-weight-bold">ReservationForm</h3>
        <div style={styles.twoColumns}>
          <section>
            <p className="m-0 py-3 font-weight-bold">Select number of persons</p>
            <div style={styles.pax}>
              <PaxSection title="Adult" type="adults"></PaxSection>
              <PaxSection title="Child (0-2 yrs)" type="kid02"></PaxSection>
              <PaxSection title="Child (3-5 yrs)" type="kid35"></PaxSection>
              <PaxSection title="Child (6-11 yrs)" type="kid611"></PaxSection>
            </div>
            <div style={{ marginTop: '24px' }}>
              <SelectHotel hotels={data.hotels} />
            </div>
          </section>
          <section>
            <p className="m-0 py-3 font-weight-bold">Select tour dates</p>
            <DatePickers data={data} plusMaxDays={2} />
          </section>
        </div>
        {userInput.hotel.code && <Hotel {...userInput} />}
      </div>
      <div style={styles.wrapper}>
        <Computation />
      </div>
      <div style={styles.wrapper}>
        <h3 className="m-0 py-3 font-weight-bold">Reservation Form</h3>
        <ReservationForm />
      </div>
    </>
  )
};

const styles = {
  wrapper: {
    padding: '16px',
    marginTop: '8px',
    backgroundColor: 'white',
    borderRadius: '2px',
  },
  twoColumns: {
    display: 'grid',
    gridTemplateColumns: '350px 350px',
    gridGap: '55px',
  },
  pax: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px'
  }
}

