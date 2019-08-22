import React from 'react';
import styled from 'styled-components';
import { Consumer } from './Context';

import numeral from 'numeral';

import { ButtonGroup, Button } from '../Buttons';
import ScrolledYWrapper from './ScrolledYWrapper';



const NoHotelWrapper = styled.div`
  margin-bottom: .5rem;
  align-items: center;
  border-radius: 1px;
  padding: 5px;
  border: 1px solid gray;
  cursor: pointer; 
  text-align: center; 
  color: #1e90ff;

  ${props => props.selected && `
    background-color:rgba(46, 204, 113,.20);
    border: 1px solid rgba(46, 204, 113,.30);
  `}    
`

const HotelWrapper = styled.div`
  display: grid;
  grid-template-columns: 115px 1fr;
  grid-gap: 5px;
  margin-bottom: 15px;
  align-items: top;
  border-radius: 1px;
  padding: 5px;
  border: 1px solid #ecf0f1;
  cursor: pointer;

  ${props => props.selected && `
    background-color:rgba(46, 204, 113,.20);
    border: 1px solid rgba(46, 204, 113,.30);
  `}  
`

const HotelName = styled.p`
  font-size: 14px;
  line-height: 1rem;
  padding-top: 4px;
  margin-bottom:0px;
`

const PriceLabel = styled.span`
  font-size: 14px;
  color: #c0392b;
`

const Image = styled.img`
  width: 95px;
  border-radius: 1px;
`

export default () => {
  return (
    <React.Fragment>
      <Consumer>
        {({ data, userInput, actions }) => {
          let code = null
          const noHotel = {code:"", price:0, name:""}
          if (userInput.hasOwnProperty('hotel')) {
            code = userInput.hotel.code
          }
          const hotels = data.hotels.sort((a,b) => {
            return  a.price - b.price
          })
          return (
            <span>
              <ScrolledYWrapper>
                <p className="m-0 py-3 font-weight-bold">Select Hotel</p>
                <NoHotelWrapper 
                  selected={code === ""}
                  onClick={() => actions.hotelClick(noHotel)}
                  onTouchStart={() => actions.hotelClick(noHotel)}>
                  <HotelName>Tour only (No hotel)</HotelName>
                  <PriceLabel>Php {numeral(userInput.adults[1]).format('0,0')}/person</PriceLabel>
                  </NoHotelWrapper>
                {hotels.map((hotel, index) => {
                  return (
                    <Hotel
                      data={hotel}
                      userInput={userInput}
                      nights={userInput.tourDates.hotelNights}
                      key={index}
                      selected={code === hotel.code}
                      onClick={(payload) => actions.hotelClick(payload)}
                      onTouchStart={(payload) => actions.hotelClick(payload)}
                    />
                  )
                })}
              </ScrolledYWrapper>
              <ButtonGroup>
                <Button back className="BookingFormButtons btn-back" onClick={() => actions.step('-')}>Back</Button>
                <Button next className="BookingFormButtons btn-next" onClick={() => actions.step('+')}>Proceed</Button>
              </ButtonGroup>
            </span>
          )
        }}
      </Consumer>
    </React.Fragment>
  )
}

const Hotel = props => {
  let payload = Object.assign({},props.data) // clone data object
  delete payload.photo 
  let nights = props.nights > 1 ? 'nights' : 'night'
  let adultPrice = (props.nights * props.data.price) + props.userInput.adults[1]
  return (
    <HotelWrapper onClick={()=>props.onClick(payload)} selected={props.selected}>
      <Image src={props.data.photo} />
      <div>
        <HotelName>{props.data.name}</HotelName>
        <PriceLabel>
          Php {numeral(adultPrice).format('0,0')}/person
        </PriceLabel>
      </div>
    </HotelWrapper>
  )
}