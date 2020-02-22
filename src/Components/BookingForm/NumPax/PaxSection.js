import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { Consumer, BookingContext } from '../Context';

const Title = styled.p`
  margin: 0 auto;
`
const List = styled.ul`
  margin: 5px 0;
  padding: 0;
  list-style: none;
  display:grid;
  grid-template-columns:repeat(auto-fill, 40px);
  grid-auto-rows: 40px;
  grid-gap: 3px 3px;
`
const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: 1px solid gray;
  background-color: white;
  opacity: .7;

  :hover {
    cursor: pointer;
    color: #484848;   
  }

  ${props => props.selected && `
    border-color: rgba(46, 204, 113,1.0);
    background-color: rgba(46, 204, 113,1.0);
    color: white; 
    opacity: 1.0;
    :hover {
      color: white;
    }
  `}
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
