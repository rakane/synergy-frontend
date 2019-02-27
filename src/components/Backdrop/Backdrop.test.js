import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Backdrop from './Backdrop';
import App from '../../App';

describe('Backdrop', () => {
  it('Should render without throwing an error', () => {
    expect(mount(<App />).contains(<div className="backdrop" />));
  });

  it('Should not be visible', () => {
    expect(mount(<App />)).toHaveProperty('opacity', '1');
  });
});
