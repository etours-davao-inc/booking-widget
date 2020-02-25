import React, { useContext } from 'react';
import styled from 'styled-components';
import Select from './SelectStyles';
import { BookingContext } from './Context';

const PaxSection = ({ title, type }) => {
  const { prices, userInput, actions } = useContext(BookingContext);
  const onSelectChange = ({ target }) => {
    actions.onPaxSelect({ [type]: prices[type].find(item => item[0] === Number(target.value)) });
  }

  return (
    <Section>
      <Title>{title}</Title>
      <Select value={userInput[type][0]} onChange={onSelectChange}>
        {prices[type].map((item) => {
          let pax = item[0]
          return <option key={pax} value={pax}>{pax}</option>
        })}
      </Select>
    </Section>
  )
}

const Title = styled.p`
  font-size: 15px;
  margin: 0 auto;
`

const Section = styled.section`

`

export default PaxSection;
