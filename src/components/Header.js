import React from 'react';
import styled from 'styled-components';

import styles from './header.module.scss';

const Subheader = styled.h2`
  color: red;
  padding-bottom: 1rem;
  font-family: monospace;
`;

export default function Header() {
  return (
    <>
      <h1 className={styles.header}>Starter Kit</h1>
      <Subheader>for modern front-end apps</Subheader>
    </>
  );
}
