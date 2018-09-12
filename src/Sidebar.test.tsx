import * as React from 'react';
import { configure, shallow } from 'enzyme';
//import * as Adapter from 'enzyme-adapter-react-16';
import Sidebar from './Sidebar';

//configure({ adapter: new Adapter() });

// See more: https://basarat.gitbooks.io/typescript/docs/testing/jest.html

test('Initial Sidebar render', () => {

    const sidebar = shallow(<Sidebar  />);
    
    // Interaction demo 
    expect(sidebar.text()).toEqual('Off');
    sidebar.find('input').simulate('change');
    expect(sidebar.text()).toEqual('On');

    // Snapshot demo
    expect(sidebar).toMatchSnapshot();
});
