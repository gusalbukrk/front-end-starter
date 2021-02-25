import React from 'react';
import renderer from 'react-test-renderer';

import Subheader from './Subheader';

describe('renders correctly', () => {
  it('header', () => {
    expect.assertions(2);

    const tree = renderer.create(<Subheader>...</Subheader>).toJSON();
    expect(tree.type).toBe('h2');
    expect(tree.props.className).toBeTruthy();
  });
});
