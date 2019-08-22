import React from 'react';
import styled from 'styled-components';

import { Consumer } from '../Context';

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

const PaxSection = props => {
  return (
    <Consumer>
      {({prices, userInput, actions}) => (
      <Section>
        <Title>{props.title}</Title>
        <List>
          {prices[props.type].map((item, key) => {
            let selected = userInput[props.type][0] === item[0];
            let returnObject = {[props.type]: item}
            return (
            <Item 
              selected={selected} 
              key={key} 
              onClick={() => actions.handlePaxClick(returnObject)}
              onTouchStart={() => actions.handlePaxClick(returnObject)}>{item[0]}</Item> 
            )
          })}
        </List>
      </Section>
      )}

    </Consumer>
  )
}


export default PaxSection;
