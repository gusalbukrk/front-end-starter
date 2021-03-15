import React from 'react';
import ReactDOM from 'react-dom';

import './reset.css';
import './index.scss';

import Header from './components/Header';

console.log('from index');

function App() {
  return <Header />;
}

ReactDOM.render(<App />, document.getElementById('root'));
