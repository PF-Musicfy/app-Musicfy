import {StrictMode} from 'react';

// ✅ now importing from react-dom/client
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './store/index';
// 👇️ IMPORTANT: make sure to specify correct ID
// must be the ID of the div element in your index.html file
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
);