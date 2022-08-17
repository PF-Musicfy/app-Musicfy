import React from 'react';
import { render } from '@testing-library/react';
//import { Provider } from 'react-redux';
//import { store } from './app/store';
import App from './App';

//<Provider store={store}>
test('renders learn react link', () => {
  const { getByText } = render(
      <App />
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
