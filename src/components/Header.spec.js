import React from 'react';
import renderer from 'react-test-renderer';

import { Header } from './Header';

describe('renders correctly', () => {
  it('header', () => {
    expect.assertions(1);

    const tree = renderer.create(<Header />).toJSON();
    expect(tree.children[0]).toBe('Starter Kit');
  });
});
