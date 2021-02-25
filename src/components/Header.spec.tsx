import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies

import Header from './Header';

interface Tree {
  type: string;
  props: Record<string, unknown>;
  children: string[];
}

describe('renders correctly', () => {
  it('header', () => {
    expect.assertions(4);

    const tree = renderer.create(<Header />).toJSON() as Tree;
    expect(tree.children).not.toBeNull();
    expect(tree.children[0]).toBe('Starter Kit');

    const instance = renderer.create(<Header />).root;
    expect(instance.findByType('h1').children).toHaveLength(1);
    expect(instance.findByType('h1').children[0]).toBe('Starter Kit');
  });
});
