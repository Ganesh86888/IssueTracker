
import React, { Component } from 'react'

class  Profile extends Component{
    
    constructor(props){
        
        super(props);
       
    }
    componentDidMount(){
        let profile=JSON.parse(localStorage.getItem("register"));
        console.log(profile)
    }
   
 
render(){
    
    return(
        
        <div className="backin">
            
            <h1>Profile</h1>
            
            <ul>
            <li>
        <label><h1> Name:</h1><h2>{this.profile&&this.props.profile.firstName}</h2></label>
        </li>
        <li>
        <label><h1> email:</h1><h2>{this.profile&&this.profile.email}</h2></label>
        </li>
        <li>
        <label><h1> mobileNo:</h1><h2>{this.profile&&this.profile.mobileNo}</h2></label>
        </li>
       
        
        </ul>
        </div>

    );
        }
    
}
export default Profile