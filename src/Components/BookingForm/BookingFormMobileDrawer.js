import React, { Component } from 'react';
import Portal from '../../../../Templates/Portal';

import {Consumer} from './Context';

import styled from 'styled-components';

const MobileButton = styled.button `
  background-color: #2ecc71;
  color: white;
  height: 45px;
  font-size: 18px;
  width: 100%;
  border: none;
`

class BookingFormMobileDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  toggleShow(e) {
    this.setState({show:!this.state.show})
  }

  componentDidUpdate() {
    if (this.state.show) {
      document.body.style.overflow = "hidden";
      document.ontouchmove = function (e) {
        e.preventDefault();
      }
    } else {
      document.body.style.overflow = "visible";
      document.ontouchmove = function (e) {
        return true;
      }
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = "visible"
  }

  render() {
    if (this.state.show) {
      return (
        <Portal>
          <div className="modal">
            <div id="modalWrapper">
              <div id="modalBody">
              <span id="closePortalBtn" onClick={() => this.toggleShow()}>close [x]</span>
                {this.props.children}
              </div>
            </div>
          </div>
        </Portal>
      )
    } else {
      return (
        <div className="fixed-bottom sticky-top">
          <MobileButton 
            onClick={() => this.toggleShow()}
            onTouchStart={() => this.toggleShow()}>View price</MobileButton>
        </div>
      )
    }
  }
}


export default BookingFormMobileDrawer;
