import React from 'react';
import {shallow, mount} from 'enzyme';
import Home from './Home';

describe('When valid issues array props passed to IssueList Component', () => {
    let wrapper;
    let props;
    
    beforeEach(() => {
        props = {
            Issues: [
    
                {
                  id: 1,
                  issuedescription: "On clicking delete,the application crashes",
                  severity: "Critical",
                  status: "Open",
                },
                {
                  id: 2,
                  issuedescription: "The heading Add is wrongly displayed as edit",
                  severity: "Minor",
                  status: "Closed",
                },
                {
                  id: 3,
                  issuedescription: "The payment functionality is missing",
                  severity: "Major",
                  status: "In Progress"
                }
              ]
            }
            wrapper = shallow(<Home {...props}/>);
        });
        it('renders "Issue Description" as heading in second column', () => {
          expect(wrapper.find('issuedescription').props);
           
        }); 
        it('renders "Status" as heading in fourth column', () => {
          expect(wrapper.find('status').props);
            
        }); 
    });
    describe('When valid issues array props passed to IssueList Component', () => {
        let wrapper;
        let props;
        
        beforeEach(() => {
            props = {
                Issues: [
        
                    {
                      id: 1,
                      issuedescription: "On clicking delete,the application crashes",
                      severity: "Critical",
                      status: "Open",
                    },
                    {
                      id: 2,
                      issuedescription: "The heading Add is wrongly displayed as edit",
                      severity: "Minor",
                      status: "Closed",
                    }
                    
                  ]
                }
                wrapper = shallow(<Home {...props}/>);
            });
            it('passes the 2nd Issue description as props to second Issue Component', () => {
            expect(wrapper.find('The heading Add is wrongly displayed as edit').props);
            });
            it('passes the 2nd Issue status as props to second Issue Component ', () => {
              expect(wrapper.find('closed').props);
              });
        });
    describe('When issues array passed to IssueList Component is null', () => {
        let wrapper;
        let props;
    
        beforeEach(() => {
            props = {
                issues: null
            }
            wrapper = shallow(<Home {...props}/>);
        });
    
        it('should not crash and no IssueList component is rendered', () => {
        let issue = wrapper.find('issue');
            expect(issue.length).toEqual(0);
        });
    
    });