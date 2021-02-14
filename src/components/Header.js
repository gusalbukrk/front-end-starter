import React from 'react';
import styled from 'styled-components';
import styles from '../index.module.css';

export function Header() {
  return <h1 className={styles.header}>Starter Kit</h1>;
}

export const Subheader = styled.h2`
  color: red;
  padding-bottom: 1rem;
  font-family: monospace;
`;
