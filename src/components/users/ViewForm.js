import axios from 'axios';
import React, { Component } from 'react'
//import {Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap'
import { Redirect } from 'react-router';

import './back.css'

class ViewForm extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            issues: {}
        }
        this.back=this.back.bind(this);
        
    }

    componentDidMount(){
        console.log(this.state.id);
        
        axios.get(`http://localhost:3001/issues/${this.state.id}`)
        .then(res=>{
            console.log(res.data)
            this.setState({issues:res.data});
        }).catch(err=>{
            console.log(err);
        })
        
       
    }
    
     back(){
         console.log("ganesh")
         let issuedescription=this.state.issues.issuedescription
        let severity=this.state.issues.severity
        let status=this.state.issues.status
        let createddate=this.state.issues.createddate
        let resolveddate=this.state.issues.resolveddate
        let res=this.state.issues.count
        let count=res+1
        let id=this.state.id
        let data={issuedescription,severity,status,createddate,resolveddate,count,id}
        console.log("res",data)
        axios.put(`http://localhost:3001/issues/${this.state.id}`,data)
        .then(res=>{
            console.log(res)
        })

         return(this.props.history.push("/issues"))
         

    }
    render() {
        
        
        return (
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">Details Of Issues</h1>
                   <h3>{this.state.issues.issuedescription}</h3>    
                   <h3>{this.state.issues.severity}</h3> 
                   <h3>{this.state.issues.status}</h3> 
                   <h3>{this.state.issues.createddate}</h3> 
                   <h3>{this.state.issues.resolveddate}</h3> <br/>
                   <Button className="btn btn-warning" onClick={this.back}>Back</Button>             
                   
                   </div>
            </div>
        )}
}

export default ViewForm