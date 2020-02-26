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
  font-size: 18px;
  margin: 25px 5px;
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-gap: 5px;
  margin-bottom: 15px;
  align-items: top;
  border-radius: 2px;
  padding: 5px;
  border: 1px solid green;
`
const HotelName = styled.p`
  font-size: 1.2em;
  line-height: 1rem;
  padding-top: 4px;
  margin-bottom:0px;
  text-transform: 'capitalize';
`
const PriceLabel = styled.span`
  font-size: 18px;
`
const Image = styled.img`
  width: 120px;
  border-radius: 1px;
`


