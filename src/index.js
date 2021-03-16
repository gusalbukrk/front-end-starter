import React from 'react';
import ReactDOM from 'react-dom';

import './reset.css';
import './index.scss';

import Header from './components/Header';
import Subheader from './components/Subheader';

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
