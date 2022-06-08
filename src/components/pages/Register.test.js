import React from 'react';
import { mount, shallow } from 'enzyme';
import Register from './Register';

describe('Test Register component using Shallow rendering', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Register/>);
    });

    it('has 6 text input elements', () => {
        expect(wrapper.find('Input').length).toEqual(6);
    })

    it('has a one button', () => {
        expect(wrapper.find('Button').length).toEqual(1);
    })

   
    
});

describe('Test Register component using Full DOM rendering', () => {
    let mountWrapper;

    beforeEach(() => {
        mountWrapper = mount(<Register/>);
    });

    afterEach(() => {
        mountWrapper.unmount();
    })

    it('has 6 text input elements', () => {
        expect(mountWrapper.find('Input').length).toEqual(6);
    })

    it('has a one button', () => {
        expect(mountWrapper.find('Button').length).toEqual(1);
    })
 });