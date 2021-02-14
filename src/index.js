import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './index.scss';
import styled from 'styled-components';
import styles from './index.module.css';

console.log('from index');

const Subheader = styled.h2`
  color: red;
  padding-bottom: 1rem;
  font-family: monospace;
`;

function Header() {
  return <h1 className={styles.header}>Starter Kit</h1>;
}

function App() {
  return (
    <>
      <Header />
      <Subheader>for modern front-end apps</Subheader>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
