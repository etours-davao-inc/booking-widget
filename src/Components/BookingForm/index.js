import React from 'react';
import PriceWidget from './PriceWidget';
import { Provider } from './Context';
import ErrorBoundary from './ErrorBoundary';

export default ({data}) => {
  return (
    <ErrorBoundary>
      <Provider data={data}>
        <PriceWidget />
      </Provider>
    </ErrorBoundary>
  )
};
