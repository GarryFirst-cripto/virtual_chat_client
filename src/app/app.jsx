import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ModalWindow } from './modal';
import { store, history } from './store/store';
import { Header, Footer } from './sidepanels/headers';
import Content from './content';

const AppNew = () => (
  <>
    <Provider store={store}>
      <Header />
      <ConnectedRouter history={history}>
        <Content />
      </ConnectedRouter>
      <Footer />
      <ToastContainer />
      <ModalWindow />
    </Provider>
  </>
);

export function App() {
  render(<AppNew />, document.getElementById('root'));
}
