import React, { useContext } from 'react';
import PaxSection from './PaxSection';
import DatePickers from './DatePickers';
import { BookingContext } from './Context';
import SelectHotel from './SelectHotel';
import Computation from './Computation';
import ReservationForm from './ReservationForm';
import Hotel from './Hotel';
import DatePicker from './DatePicker';
import Loader from './Loader';

export default () => {
  const { data, userInput, validDates } = useContext(BookingContext);
  const multiday = data.type === "multiday";
  const daytour = data.type !== "multiday";
  const allowHotelChoice = data.allow_hotelchoice;
  return (
    <>
      <form id="travel-information" style={styles.wrapper}>
        <h3>Travel information</h3>
        <div style={styles.twoColumns}>
          <section>
            <h4 style={styles.customh4}>Select number of persons</h4>
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
                <h4 style={styles.customh4}>Select tour dates</h4>
                <DatePickers data={data} plusMaxDays={2} />
              </>
            }
            {daytour &&
              <>
                <h4 style={styles.customh4}>Select tour date</h4>
                <p style={{ fontSize: '15px', margin: '0 auto' }}>Tour date</p>
                <DatePicker />
              </>
            }
          </section>
          <section>
            {multiday && <SelectHotel hotels={data.hotels} />}
          </section>
        </div>
        {allowHotelChoice && userInput.hotel.code && <Hotel {...userInput} />}
      </form>
      { validDates ? 
          <>
            <WrappedComputation />
            <WrappedReservationForm />
          </>
        :
          <Loader />
      }
    </>
  )
};

const WrappedComputation = () => <div style={styles.wrapper}><Computation /></div>
const WrappedReservationForm = () => <div style={styles.wrapper}><ReservationForm /></div>
const WrappedLoader = () => <div style={styles.wrapper}><Loader /></div>


const styles = {
  wrapper: {
    padding: '18px',
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
  },
  customh4: {
    fontSize: '17px',
    padding: '8px 0',
    margin: '15px 0',
    color: 'black'
  },
  blur: {
    WebkitFilter: 'blur(5px)',
    MFilter: 'blur(5px)',
    OFilter: 'blur(5px)',
    msfilter: 'blur(5px)',
    filter: 'blur(5px)',
    backgroundColor: '#ccc',
  }
}

