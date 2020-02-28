import React, { useState } from 'react';
import { addDays, differenceInCalendarDays } from 'date-fns';

import isEmail from 'validator/lib/isEmail';

import { Calculate } from 'price-compute-js';
import { sendReservation } from 'firebase-etours-booking-crud';

import { setOptionPaymentDate } from 'tour-dates-utility';

export const BookingContext = React.createContext();

export const Provider = ({ data, children }) => {
  const today = new Date();
  const { name, code, slug, type, duration, duration_text, info, terms } = data
  const { startday, offsetnights } = data;

  const InitialUserInput = {
    inquiryDate: today,
    adults: data.price.adults[0],
    kid02: [0, 0],
    kid35: [0, 0],
    kid611: [0, 0],
    name: "",
    email: "",
    contact: "",
    remarks: "",
  }

  if (type === 'multiday') {
    const tourDates = {};
    tourDates.from = addDays(today, startday);
    setOptionPaymentDate(today, tourDates.from).then(date => {
      InitialUserInput.optionDate = date;
    })
    tourDates.to = addDays(tourDates.from, duration - 1);
    tourDates.days = differenceInCalendarDays(tourDates.to, tourDates.from) + 1;
    tourDates.nights = tourDates.days - 1;
    tourDates.hotelNights = tourDates.nights - offsetnights;
    InitialUserInput.tourDates = tourDates;
    InitialUserInput.hotel = { code: "", price: 0, name: "", photo: "" };
    InitialUserInput.startDate = tourDates.from
  } else {
    InitialUserInput.tourDate = addDays(today, startday);
    setOptionPaymentDate(today, InitialUserInput.tourDate).then(date => {
      InitialUserInput.optionDate = date

    })
  }

  const [state, setState] = useState({ data: data, RFValid: false, termsAccepted: false, validDates: true, status:'on' })
  const [tourpackage] = useState({ name, code, slug, type, duration, duration_text, info, terms })
  const [userInput, setUserInput] = useState(InitialUserInput)

  const [calculations, setCalculations] = useState(Calculate(userInput));

  const onPaxSelect = (payload) => {
    setUserInput({ ...userInput, ...payload })
    doComputations({ ...userInput, ...payload })
  }

  const onSelectDate = (tourDate) => {
    setOptionPaymentDate(userInput.inquiryDate, payload).then(optionDate => {
      setUserInput({ ...userInput, tourDate, optionDate })
      doComputations({ ...userInput, tourDate, optionDate })
    })

  }

  const onSelectDates = (tourDates) => {
    setOptionPaymentDate(userInput.inquiryDate, tourDates.from).then(optionDate => {
      setState({...state, validDates: true})
      setUserInput({ ...userInput, tourDates, optionDate })
      doComputations({ ...userInput, tourDates, optionDate })
    })
  }

  const setInvalidDates = () => {
    setState({...state, validDates:false})
  }

  const onSelectHotel = (payload) => {
    if (payload) {
      setUserInput({ ...userInput, hotel: state.data.hotels.find(hotel => hotel.code === payload) })
      doComputations({ ...userInput, hotel: state.data.hotels.find(hotel => hotel.code === payload) })
    } else {
      setUserInput({ ...userInput, hotel: { code: "", price: 0, name: "" } })
      doComputations({ ...userInput, hotel: { code: "", price: 0, name: "" } })
    }

  }

  const handleRFChange = ({ target }) => {
    if (target.name == "terms") {
      const RFValid = checkRFvalid(userInput, target.checked)
      setState({ ...state, termsAccepted: target.checked, RFValid })
    } else {
      const RFValid = checkRFvalid({ ...userInput, [target.name]: target.value }, state.termsAccepted)
      setUserInput({ ...userInput, [target.name]: target.value })
      setState({ ...state, RFValid })
    }
  }

  const checkRFvalid = (userInput, termsAccepted) => {
    const { name, email } = userInput
    if (name != "" && email != "" && isEmail(email) && termsAccepted) {
      return true
    } else {
      return false
    }
  }

  const submitBooking = (e) => {
    e.preventDefault();
      if (state.RFValid) {
      console.log(state, userInput, calculations, tourpackage)
      sendReservation({
        input: userInput,
        calculations: calculations,
        package: tourpackage
      }).then(obj => {
        console.log(obj)
        setState({...state, status:'done'})
      }).catch(error => {
        setState({...state, status:'error'})
      })  
    }
  }

  const doComputations = (payload) => {
    setCalculations(Calculate(payload))
  }

  const refreshForm = () => setState({...state, status: 'on'})

  return (
    <BookingContext.Provider value={{
      data: state.data,
      prices: state.data.price,
      RFValid: state.RFValid,
      validDates: state.validDates,
      termsAccepted: state.termsAccepted,
      status: state.status,
      userInput,
      calculations,
      actions: {
        onPaxSelect,
        onSelectDate,
        onSelectDates,
        setInvalidDates,
        onSelectHotel,
        handleRFChange,
        submitBooking,
        refreshForm,
      }
    }}>
      {children}
    </BookingContext.Provider>
  )

}

export const Consumer = BookingContext.Consumer;