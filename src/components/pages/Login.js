import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap';
import { isEmail } from 'validator';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state={
            Issues:[],
        }
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        data: {
            email: '',
            password: '',
            redirectToReferrer : false
        },
        errors: {}
    });

    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
    }

    validate = () => {
        const { data } = this.state;
        let errors = {};

       if (!isEmail(data.email)) errors.email = 'Email must be valid.';
        if (data.email === '') errors.email = 'Email can not be blank.';
        if (data.password === '') errors.password = 'Password must be valid.';
        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        

        const { data } = this.state;

        const errors = this.validate();
        let flag=false;

        if (Object.keys(errors).length === 0) {
            console.log(data);
            axios.post("http://localhost:3001/login",data)
            {this.state.Issues.map(issue=>{
                console.log(issue.email)
                console.log(data.email)
                if(issue.email===data.email&&issue.password===data.password){
                    flag=true;
                    
                }
                return flag;
              
            })}
            console.log(flag)
            if(flag===true){
                let userresponse = data;
                    if(userresponse){
                    localStorage.setItem('data',JSON.stringify(userresponse));
                    this.setState({redirectToReferrer: true});
                    }
                    alert("sign in successfully")
                    return(<Redirect to="/"/>)
            }
            else{
                alert("you are not registered user,please register to sign in")
                this.props.history.push("/register")
            }
        } 
        else {
            this.setState({ errors });
        }
    }
    componentDidMount(){
        axios.get("http://localhost:3001/register")
        .then(res=>{
            this.setState({Issues:res.data})
        })
       
        
    }

    render() {
        const { data, errors } = this.state;
        if (this.state.redirectToReferrer){
        
          return (<Redirect to={'/'}/>)
          }
          if (localStorage.getItem('data')){
          
              return (<Redirect to={'/'}/>)
              }
        return (

            <div className="container back">
                <div className="w-75 mx-auto shadow p-5 background">
                <h3>Login Form</h3>
            <Form onSubmit={this.handleSubmit}>
            

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" value={data.email} invalid={errors.email ? true : false} name="email" onChange={this.handleChange} placeholder="Enter a email"/>
                    <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" value={data.password} type="password" name="password" invalid={errors.password ? true : false} onChange={this.handleChange} placeholder="enter a password" />
                    <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>

                <Button color="primary" className="btn btn-primary btn-block">Login</Button>
            </Form>
            </div>
            </div>
        );
    }
}

export default Login;
