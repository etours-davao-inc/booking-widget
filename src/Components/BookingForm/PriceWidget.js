import React, { useContext } from 'react';
import SelectPax from './SelectPax';
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
          <SelectPax />
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
                <label htmlFor="tourdate" style={{ fontSize: '15px', margin: '0 auto' }}>Tour date</label>
                <DatePicker id="tourdate" />
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

const styles = {
  wrapper: {
    padding: '18px',
    marginTop: '8px',
    backgroundColor: 'white',
    borderRadius: '2px',
  },
  twoColumns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
    gridGap: '15px 55px',
  },
  customh4: {
    fontSize: '17px',
    padding: '8px 0',
    margin: '15px 0',
    color: 'black'
  }
}

