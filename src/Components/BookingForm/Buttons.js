import React from 'react';

import styled from 'styled-components';

const ButtonGroup = styled.section`
  display: flex;
  justify-content: space-around;
  margin-top: auto;
  width: 100%;
`

const Button = styled.button`
  flex-grow: 1;
  border-radius: 0;
  padding: 8px;

  ${props => props.next &&`
    border: 1px solid #2ecc71;
    background-color: #2ecc71;
    color: white;  
  `}

  ${props => props.back &&`
    border: 1px solid #ECF0F1;
    background-color: #ECF0F1;
  `} 

  ${props => props.disabled &&`
    border: 1px solid #2ecc71;
    background-color: #2ecc71;
    opacity: .6;
  `}     
`
export { ButtonGroup, Button }



