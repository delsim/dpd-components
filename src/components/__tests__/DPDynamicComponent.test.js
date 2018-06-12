import React from 'react';
import {shallow} from 'enzyme';
import DPDynamicComponent from '../DPDynamicComponent.react';

describe('DPDynamicComponent', () => {

    it('renders', () => {
        const component = shallow(<DPDynamicComponent label="Test label"/>);
        expect(component).to.be.ok;
    });
});
