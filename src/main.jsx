import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';

import App from './components/App/App.jsx';

import { store } from './redux/store.js';

import 'modern-normalize';
import './styles/styles.css';
import { Provider } from 'react-redux';

Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
