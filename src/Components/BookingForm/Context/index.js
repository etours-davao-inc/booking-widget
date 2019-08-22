import React, { Component } from 'react';

import isEmail from 'validator/lib/isEmail';
import { format } from 'date-fns';

import { Calculate } from 'price-compute-js';
import postReservation  from './postReservation';

import { initDayRangeValues, setDayRange, getStartDate, setOptionPaymentDate } from 'tour-dates-utility';
import { DayTour, MultiDay, MultiDayWithHotel } from './Modules';

const BookingContext = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      currentStep: 0,
      currentModule: '',
      applicableModules: '',
      RFValid: false,
      termsAccepted: false,
      package: {
        name: props.data.name,
        code: props.data.code,
        slug: props.data.slug,
        type: props.data.type,
        duration: props.data.duration,
        durationText: props.data.duration_text,
        info: props.data.info,
        responsibilities: props.data.responsibilites,
        terms: props.data.terms
      },
      userInput: {
        inquiryDate: new Date(),
        adults: props.data.price.adults[0],
        kid02: [0, 0],
        kid35: [0, 0],
        kid611: [0, 0],
        name: "",
        email: "",
        contact: "",
        remarks: ""
      },
      calculations: {},
    }
  }

  componentWillMount() {
    new Promise((resolve, reject) => {
      resolve(this.loadProperModules())
    }).then((resolve) => {
      let currentStep = this.state.currentStep
      this.updateCurrentModule(currentStep, resolve)
    })
    this.initializeDates()

  }

  componentDidMount() {
    window.scrollTo(0,0)
  }

  loadProperModules() {
    let tourType = this.state.data.type
    let withHotels = this.state.data.hotels !== undefined
    let applicableModules;
    if (tourType === 'daytour') {
      applicableModules = DayTour
    } else if (tourType === 'multiday' && withHotels) {
      applicableModules = MultiDayWithHotel
    } else if (tourType === 'multiday' && !withHotels) {
      applicableModules = MultiDay
    }
    return applicableModules
  }

  initializeDates() {
    let userInput = this.state.userInput;
    let { duration, startday, offsetnights, limitdays } = this.state.data
    let today = new Date();
    if (this.state.data.type === "multiday") {
      let { from, to, days, maxDays, nights, hotelNights } = initDayRangeValues(today, duration, startday, offsetnights, limitdays)
      userInput.tourDates = { from: from, to: to, days: days, nights: nights, hotelNights: hotelNights }
      setOptionPaymentDate(today, from)
      .then(optionDate => {
        userInput.tourDates.optionDate = optionDate
      })
      this.setState({ userInput: userInput, disabledDaysBefore: from, minDays: duration, maxDays: maxDays, isRange: true, })
    } else {
      userInput.tourDate = getStartDate(today, startday)
      setOptionPaymentDate(userInput.inquiryDate, userInput.tourDate)
      .then(optionDate => {
        userInput.optionDate = optionDate
      })
      this.setState({ userInput: userInput, disabledDaysBefore: userInput.tourDate })
    }
  }

  step(key) {
    let currentStep = this.state.currentStep
    switch (key) {
      case '+':
        currentStep++
        break;
      case '-':
        currentStep--
      default:
        break;
    }
    let applicableModules = this.state.applicableModules
    this.updateCurrentModule(currentStep, applicableModules)
  }

  updateCurrentModule(currentStep, applicableModules) {
    let currentModule = applicableModules[currentStep]
    if (currentModule == 'Computation') {
      this.doComputations()
    }
    this.setState({
      currentStep: currentStep,
      currentModule: currentModule,
      applicableModules: applicableModules
    })
  }

  doComputations() {
    let calculations = Calculate(this.state.userInput);
    this.setState({ calculations: calculations })
  }

  handlePaxClick(paxObj) {
    let userInput = this.state.userInput
    let key = Object.keys(paxObj)[0]
    userInput[key] = paxObj[key]
    this.setState({ userInput: userInput })
  }

  clickNewDate(date) {
    let userInput = this.state.userInput
    userInput.tourDate = date;
    setOptionPaymentDate(userInput.inquiryDate, date).then(optionDate => {
      userInput.optionDate = optionDate;
    })
    this.setState({ userInput: userInput })
  }

  clickDayRange(date) {
    let updatedState = setDayRange(this.state, date)
    let today = updatedState.userInput.inquiryDate
    let from = updatedState.userInput.tourDates.from
    setOptionPaymentDate(today, from).then(optionDate => {
      updatedState.userInput.tourDates.optionDate = optionDate;
    })
    this.setState(updatedState)
  }

  hotelClick(payload) {
    let userInput = this.state.userInput
    userInput.hotel = payload
    this.setState({ userInput: userInput })
  }

  handleRFChange(e) {
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

  isvalidRF(userInput, termsAccepted) {
    let name = userInput.name
    let email = userInput.email
    if (name != ""
      && email != ""
      && isEmail(email)
      && termsAccepted) {
      return true
    } else {
      return false
    }
  }

  submitBooking = () => {
    postReservation({
      input: this.state.userInput,
      calculations: this.state.calculations,
      package: this.state.package
    })
    this.step('+')
  }

  resetBookingForm = () => {
    this.setState({
      currentStep: 0,
      currentModule: '',
      RFValid: false,
      termsAccepted: false,
      userInput: {
        inquiryDate: new Date(),
        adults: this.state.data.price.adults[0],
        kid02: [0, 0],
        kid35: [0, 0],
        kid611: [0, 0],
        name: "",
        email: "",
        contact: "",
        remarks: ""
      },
      calculations: {},
    })
  }

  render() {
    return (
      <BookingContext.Provider value={{
        data: this.state.data,
        prices: this.state.data.price,
        currentStep: this.state.currentStep,
        currentModule: this.state.currentModule,
        RFValid: this.state.RFValid,
        termsAccepted: this.state.termsAccepted,
        userInput: this.state.userInput,
        calculations: this.state.calculations,
        disableDaysBefore: this.state.disabledDaysBefore,
        isRange: this.state.isRange,
        actions: {
          step: this.step.bind(this),
          handlePaxClick: this.handlePaxClick.bind(this),
          clickNewDate: this.clickNewDate.bind(this),
          clickDayRange: this.clickDayRange.bind(this),
          hotelClick: this.hotelClick.bind(this),
          handleRFChange: this.handleRFChange.bind(this),
          submitBooking: this.submitBooking.bind(this),
          resetBookingForm: this.resetBookingForm.bind(this)
        }
      }}>
        {this.props.children}
      </BookingContext.Provider>
    )
  }
}

export const Consumer = BookingContext.Consumer;