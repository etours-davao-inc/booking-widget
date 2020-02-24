import React, { useState } from 'react';

import isEmail from 'validator/lib/isEmail';

import { Calculate } from 'price-compute-js';
import postReservation  from './postReservation';

import { setDayRange, setOptionPaymentDate } from 'tour-dates-utility';

export const BookingContext = React.createContext();

export const Provider = ({data, children}) => {
  const { name, code, slug, type, duration, duration_text, info, responsibilities, terms } = data
  const [state, setState] = useState({ data: data, RFValid: false, termsAccepted: false})
  const [tourPackage] = useState({name, code, slug, type, duration, duration_text, info, responsibilities, terms })
  const [userInput, setUserInput] = useState({
    inquiryDate: new Date(),
    adults: data.price.adults[0],
    kid02: [0, 0],
    kid35: [0, 0],
    kid611: [0, 0],
    name: "",
    email: "",
    contact: "",
    remarks: ""
  })
  const [calculations, setCalculations] = useState({})

  const onPaxSelect = (payload) => {
    setUserInput({...userInput,...payload})
  }

  const onSelectDate = (tourDate) => {
    setOptionPaymentDate(userInput.inquiryDate, payload).then(optionDate => {
      setUserInput({...userInput, tourDate, optionDate})
    })
  }

  const onSelectDates = (tourDates) => {
    setOptionPaymentDate(userInput.inquiryDate, tourDates.from).then(optionDate => {
      setUserInput({...userInput, tourDates, optionDate})
    })
  }

  const onSelectHotel = (payload) => {
    if (payload) {
      setUserInput({...userInput, hotel:state.data.hotels.find(hotel => hotel.code === payload)})
    } else {
      setUserInput({...userInput, hotel: {code:"", price:0, name:""}})
    }
  }

  const handleRFChange = (e) => {
    let userInput = { ...this.state.userInput }
    let termsAccepted = this.state.termsAccepted
    if (e.target.name == "terms") {
      termsAccepted = !termsAccepted
    } else {
      userInput[e.target.name] = (e.target.value) 
    }
    
    let RFValid = this.isvalidRF(userInput, termsAccepted)
    this.setState({
      userInput: userInput,
      termsAccepted: termsAccepted,
      RFValid: RFValid
    })
  }

  const isvalidRF = (userInput, termsAccepted) => {
    // let name = userInput.name
    // let email = userInput.email
    // if (name != ""
    //   && email != ""
    //   && isEmail(email)
    //   && termsAccepted) {
    //   return true
    // } else {
    //   return false
    // }
  }

  const submitBooking = () => {
    // postReservation({
    //   input: this.state.userInput,
    //   calculations: this.state.calculations,
    //   package: this.state.package
    // })
    // this.step('+')
  }

  const doComputations = () => {
    setCalculations(Calculate(userInput))
  }

  const resetBookingForm = () => {
    // this.setState({
    //   currentStep: 0,
    //   currentModule: '',
    //   RFValid: false,
    //   termsAccepted: false,
    //   userInput: {
    //     inquiryDate: new Date(),
    //     adults: this.state.data.price.adults[0],
    //     kid02: [0, 0],
    //     kid35: [0, 0],
    //     kid611: [0, 0],
    //     name: "",
    //     email: "",
    //     contact: "",
    //     remarks: ""
    //   },
    //   calculations: {},
    // })
  }
    return (
      <BookingContext.Provider value={{
        data: state.data,
        prices: state.data.price,
        RFValid: state.RFValid,
        termsAccepted: state.termsAccepted,
        userInput,
        calculations,
        actions: {
          onPaxSelect,
          onSelectDate,
          onSelectDates,
          onSelectHotel,
          handleRFChange,
          submitBooking,
          resetBookingForm
        }
      }}>
        {children}
      </BookingContext.Provider>
    )

}

export const Consumer = BookingContext.Consumer;