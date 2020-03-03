import React from 'react';
import PriceWidget from './PriceWidget';
import { Provider } from './Context';
import ErrorBoundary from './ErrorBoundary';
import { Animated } from "react-animated-css";

export default ({ data }) => {
  return (
    <ErrorBoundary>
      <Provider data={data}>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <PriceWidget />
        </Animated>
      </Provider>
    </ErrorBoundary>
  )
};
