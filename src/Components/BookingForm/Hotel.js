import React from 'react';
import styled from 'styled-components';
import Currency from 'react-currency-formatter';
import numeral from 'numeral';

export default ({tourDates, hotel, adults}) => {
  let nights = tourDates.nights > 1 ? 'nights' : 'night';
  let adultPrice = (tourDates.hotelNights * hotel.price) + adults[1];
  let price = <Currency quantity={adultPrice} currency="PHP" pattern="!##,### "/>;
  const format = (price) => `₱${numeral(price).format('0,0')}`
  return (
    <HotelWrapper>
      <Image src={hotel.photo} />
      <div style={{padding: '5px'}}>
        <HotelName style={{textTransform: 'capitalize'}}>{hotel.name.toLowerCase()}</HotelName>
        <p>{`${tourDates.nights} ${nights}`}</p>
        <PriceLabel>{`${format(adults[1])} + (${format(hotel.price)} x ${tourDates.hotelNights} ${nights}) = ${format(adultPrice)}`}</PriceLabel>
      </div>
    </HotelWrapper>
  )
}

const HotelWrapper = styled.div`
  display: grid;
  grid-gap: 5px;
  font-size: 14px;
  grid-template-columns: 75px 1fr;
  @media (min-width: 768px) {  
  font-size:18px;
  grid-template-columns: 120px 1fr;
  }

  margin: 25px 5px;
  margin-bottom: 15px;
  align-items: top;
  border-radius: 2px;
  padding: 5px;
  border: 1px solid green;
`
const HotelName = styled.p`
  font-size: 1.1em;
  line-height: 1.1em;
  margin-bottom:0px;
  padding: 0 0 4px 0;
  text-transform: 'capitalize';
`
const PriceLabel = styled.span`
  font-size: 1em;
`
const Image = styled.img`
  width: 75px;
  @media (min-width: 768px) {  
    width: 120px;
  }
  border-radius: 1px;
`


