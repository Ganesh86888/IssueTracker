import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap';
import { isEmail } from 'validator';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
      
    }

    getInitialState = () => ({
        data: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            mobileNo:'',
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

        if (data.firstName === '') errors.firstName = 'First Name can not be blank.';
        if (data.lastName === '') errors.lastName = 'Last Name can not be blank.';
        if (!isEmail(data.email)) errors.email = 'Email must be valid.';
        if (data.email === '') errors.email = 'Email can not be blank.';
        if (data.password === '') errors.password = 'Password must be valid.';
        if (data.confirmPassword !== data.password) errors.confirmPassword = 'Passwords must match.';
        if(data.mobileNo==='') errors.mobileNo="Mobile Number can not be blank";

        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        

        const { data } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            console.log(data);
         axios.post(" http://localhost:3001/register",data)
         .then((response) =>
            { 
                let userresponse = response;
                console.log(userresponse.data);
                if(userresponse){
                localStorage.setItem('register',JSON.stringify(userresponse.data));
                this.setState({redirectToReferrer: true});
                }
                
            },this)
            .catch((error) => alert(error))

            this.setState(this.getInitialState());
            alert("you Are registered succesfully")
            //this.props.history.push("/issues");
        } else {
            this.setState({ errors });
        }
    }


    render() {
        const { data, errors } = this.state;
        if (this.state.redirectToReferrer){
        
            return (<Redirect to={'/login'}/>)
            }
            if (localStorage.getItem('register')){
            
                return (<Redirect to={'/login'}/>)
                }
        return (
            
            <div className="container back">
                <div className="w-75 mx-auto shadow p-5 background">
                <h3>Registration Form</h3>
            <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input id="firstName" value={data.firstName} placeholder="First Name" invalid={errors.firstName ? true : false} name="firstName" onChange={this.handleChange} />
                    {<FormFeedback>{errors.firstName}</FormFeedback>}
                </FormGroup>

                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input id="lastName" value={data.lastName} placeholder="Last Name" invalid={errors.lastName ? true : false} name="lastName" onChange={this.handleChange} />
                    <FormFeedback>{errors.lastName}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" value={data.email} placeholder="Email" invalid={errors.email ? true : false} name="email" onChange={this.handleChange} />
                    <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" value={data.password} placeholder="Password" type="password" name="password" invalid={errors.password ? true : false} onChange={this.handleChange} />
                    <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" value={data.confirmPassword} placeholder="Confirm Password" type="password" name="confirmPassword" invalid={errors.confirmPassword ? true : false} onChange={this.handleChange} />
                    <FormFeedback>{errors.confirmPassword}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="mobileNo">Mobile No</Label>
                    <Input id="mobileNo" value={data.mobileNo} placeholder="Mobile Number" type="text" name="mobileNo" invalid={errors.mobileNo ? true : false} onChange={this.handleChange} />
                    <FormFeedback>{errors.mobileNo}</FormFeedback>
                </FormGroup>

                <Button color="primary" className="btn btn-primary btn-block">Register</Button>
            </Form>
            </div>
            </div>
        );
    }
}

export default Register;
