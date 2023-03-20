import React from 'react';
import Exercise from '../../src/Exercise';

describe('Exercise', () => {
  const defaultRender = <Exercise />;

  // Snapshot Tests
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  // Prop Tests
  it('should use the default value when no value is given', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.find('.exercise').text()).toEqual('default');
  });

  // Structure Tests
  it('should have the class exercise', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.prop('className')).toContain('exercise');
  });
});
