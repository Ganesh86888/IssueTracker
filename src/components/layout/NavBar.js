import React, { useState } from 'react';
//import SearchIcon from '@material-ui/icons/Search'
import './Header.css'
import {Link, useHistory} from 'react-router-dom'
import { Navbar,Nav,NavDropdown} from 'react-bootstrap';



function NavBar(){
   let local=JSON.parse(localStorage.getItem("register"));
   //console.log(local.password)

  
    const history=useHistory();
  
  function logout(){
    
     
      if(localStorage.getItem('data')){
        alert("you have successfully logged out")
      }
      localStorage.clear('data');
      
        history.push('/')
  }
  function profile(){
      history.push('/profile')
  }
    return(
      <div className="row">
      <div className="col-md-12">
      <Navbar className="bg"  variant="dark" expand="lg" sticky="top">
      
                <div className="header__option">
                    <span className="option__linetwo">Issue tracker</span>
                </div>
            
     
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    
      
    <Nav className="justify-content-end " style={{width:"100%"}}>
      
        <Link to='/' className="header__link">
                <div className="header__option">
                    <span className="option__linetwo">Issue List</span>
                </div>
            </Link>
           <div></div>
           {!local&&(<Link to='/login' className="header__link">
                <div className="header__option">
                    <span className="option__linetwo">sign in</span>
                </div>
            </Link>)}
           
           
            <Link to='/about' className="header__link">
                <div className="header__option">
                    <span className="option__linetwo">About</span>
                </div>
            </Link>
            <Link to='/chart' className="header__link">
                <div className="header__option">
                    <span className="option__linetwo">Chart</span>
                </div>
            </Link>
            <div>
                {local&&(<NavDropdown title={local&&local.firstName}>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            <NavDropdown.Item onClick={profile}>Profile</NavDropdown.Item>
        </NavDropdown>)}
           
        </div>

            
    </Nav>
    
    </Navbar.Collapse> 
    
</Navbar>
</div>
</div>
    )
    
    
}
export default NavBar