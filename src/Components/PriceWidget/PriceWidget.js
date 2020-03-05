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
import Terms from './Terms'; 

export default () => {
  const { data, userInput, validDates, actions } = useContext(BookingContext);
  const multiday = data.type === "multiday";
  const daytour = data.type !== "multiday";
  const allowHotelChoice = data.allow_hotelchoice;
  return (
    <>
      <form id="travel-information" style={{...styles.wrapper, ...styles.form}}>
        <h3 style={styles.h3}>Travel information</h3>
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
                <DatePicker 
                  id="tourdate"
                  startDate={userInput.startDate}
                  minDate={userInput.startDate}
                  emitChange={date => actions.onSelectDate(date)} />
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
            <WrappedTerms />
            <WrappedReservationForm />
          </>
        :
          <Loader />
      }
    </>
  )
};

const WrappedComputation = () => <div style={styles.wrapper}><Computation /></div>
const WrappedTerms = () => <div style={styles.wrapper}><Terms /></div>
const WrappedReservationForm = () => <div style={styles.wrapper}><ReservationForm /></div>

const styles = {
  form: {
    backgroundColor: '#F5D76E',
  },
  wrapper: {
    width: '100%',
    padding: '18px',
    marginTop: '8px',
    borderRadius: '2px',
    backgroundColor:'rgba(236, 240, 241,0.50)',
  },
  twoColumns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
    gridGap: '15px 45px',
  },
  customh4: {
    fontSize: '17px',
    padding: '8px 0',
    margin: '15px 0',
    color: 'black'
  },
  h3: {
    color: '#d35400',
    fontSize: '17px'
  }
}

