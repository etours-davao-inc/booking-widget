import React, { useContext } from 'react';
import PaxSection from './PaxSection';
import DatePickers from './DatePickers';
import { BookingContext } from './Context';
import SelectHotel from './SelectHotel';
import Computation from './Computation';
import ReservationForm from './ReservationForm';
import Hotel from './Hotel';
import DatePicker from './DatePicker';

export default () => {
  const { data, userInput } = useContext(BookingContext);
  const multiday = data.type === "multiday";
  const daytour = data.type !== "multiday";
  return (
    <>
      <div style={styles.wrapper}>
        <h3 className="m-0 py-3 font-weight-bold">Travel information</h3>
        <div style={styles.twoColumns}>
          <section>
            <p className="m-0 py-3 font-weight-bold">Select number of persons</p>
            <div style={styles.pax}>
              <PaxSection title="Adult" type="adults"></PaxSection>
              <PaxSection title="Child (0-2 yrs)" type="kid02"></PaxSection>
              <PaxSection title="Child (3-5 yrs)" type="kid35"></PaxSection>
              <PaxSection title="Child (6-11 yrs)" type="kid611"></PaxSection>
            </div>
          </section>
          <section>
            {multiday &&
              <>
                <p className="m-0 py-3 font-weight-bold">Select tour dates</p>
                <DatePickers data={data} plusMaxDays={2} />
              </>
            }
            {daytour &&
              <>
                <p className="m-0 py-3 font-weight-bold">Select tour date</p>
                <p style={{ fontSize: '15px', margin: '0 auto' }}>Tour date</p>
                <DatePicker />
              </>
            }
          </section>
          <section>
            {multiday &&
              <div>
                <SelectHotel hotels={data.hotels} />
              </div>
            }
          </section>
        </div>
        {multiday && userInput.hotel.code && <Hotel {...userInput} />}
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(350px, 100%), 1fr))',
    gridGap: '15px 55px',
  },
  pax: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px'
  }
}

