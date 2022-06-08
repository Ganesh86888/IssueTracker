import React from 'react';
import { mount, shallow } from 'enzyme';
import AddIssue from './AddIssue';

describe('Test AddIssue using Shallow rendering', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AddIssue/>);
    });
    it('has a 6 inputs', () => {
        expect(wrapper.find('input').length).toEqual(0);
    
    
    })
    it('has a single button', () => {
        expect(wrapper.find('button').length).toEqual(0);
    })
    it('renders every input heading correctly', () => {
        expect(wrapper.find('h5').length).toEqual(0);
    })
    it('renders ADD ISSUE heading correctly', () => {
        expect(wrapper.find('h2').length).toEqual(0);
    })
   
});
