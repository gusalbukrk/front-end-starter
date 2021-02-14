import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './index.scss';

import { Header, Subheader } from './components/Header';

console.log('from index');

function App() {
  return (
    <>
      <Header />
      <Subheader>for modern front-end apps</Subheader>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
