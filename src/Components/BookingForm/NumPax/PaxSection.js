import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { Consumer, BookingContext } from '../Context';

const Title = styled.p`
  margin: 0 auto;
`

const Section = styled.section`
  padding: 5px 0;
`

const PaxSection = ({ title, type }) => {
  const { prices, userInput, actions } = useContext(BookingContext);
  const onSelectChange = ({target}) => {
    let selected = {[type]: prices[type].find(item => item[0] === Number(target.value))}
    actions.handlePaxClick(selected);
  }
  console.log("HERE", userInput)
  return (
    <Section>
      <Title>{title}</Title>
      <select value={userInput[type][0]} onChange={onSelectChange}>
        {prices[type].map((item) => {
          let pax = item[0]
          return <option key={pax} value={pax}>{pax}</option>
        })}
      </select>
    </Section>
  )
}

export default PaxSection;
