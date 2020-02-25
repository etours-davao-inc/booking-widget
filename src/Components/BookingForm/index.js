import React from 'react';
import MultiDayForm from './MultiDayForm';
import { Provider } from './Context';
import ErrorBoundary from './ErrorBoundary';

export default ({data}) => {
  return (
    <ErrorBoundary>
      <Provider data={data}>
        <MultiDayForm />
      </Provider>
    </ErrorBoundary>
  )
};
