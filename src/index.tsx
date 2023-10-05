import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/UserContext/UserContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 <React.StrictMode>
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
