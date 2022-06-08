
import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from './Login';

describe('Test Login component using Shallow rendering', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Login/>);
    });

    it('has 2 text input elements', () => {
        expect(wrapper.find('Input').length).toEqual(2);
    })

    it('has a one button', () => {
        expect(wrapper.find('Button').length).toEqual(1);
    })

   
    
});

describe('Test Login component using Full DOM rendering', () => {
    let mountWrapper;

    beforeEach(() => {
        mountWrapper = mount(<Login/>);
    });

    afterEach(() => {
        mountWrapper.unmount();
    })

    it('has 2 text input elements', () => {
        expect(mountWrapper.find('input').length).toBe(2);
    })

    it('has a one button', () => {
        expect(mountWrapper.find('button').length).toBe(1);
    })
 });