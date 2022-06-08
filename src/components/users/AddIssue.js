import React, { useState } from 'react';
 import { withFormik } from 'formik';
import axios from 'axios';
import { Redirect, useHistory,Prompt } from 'react-router-dom';
 
 const AddIssue = props => {
   const[modified,setModified]=useState(false);
  const history=useHistory();
   const {
     values,
     touched,
     errors,
     handleChange,
     handleBlur,
     handleSubmit,
   } = props;
   function handlemodified(){
     setModified(true);
   }
   function cancel(){
     alert("are you sure you want to cancel the details")
     history.push("/")
   }
  
   return (
    <div>
      <div className="container">
      <div className="w-75 mx-auto shadow p-5 background">
        <div className="text-center mb-4"><h2>Add Issue Page</h2></div>
        <form onSubmit={handleSubmit}>
        
          <div className="form-group">
          <label><h5>IssueDescription:</h5></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter IssueDescription"
              name="issuedescription"
              value={values.issuedescription}
              onChange={handleChange}
              onInput={handlemodified}
            />
            <Prompt when={modified} message="are you sure you want to leave the page"/>
            {errors.issuedescription && touched.issuedescription && <div id="feedback" style={{color:"red"}}>{errors.issuedescription}</div>}
          </div>
          <div className="form-group">
          <label><h5>Severity:</h5></label>
            <select className="form-control" value={values.severity} onInput={handlemodified} onChange={handleChange} name="severity">
            <option selected>Select severity</option>
              <option value="Minor">Minor</option>
              <option value="Major">Major</option>
              <option value="Critical">Critical</option>
            </select>
            {errors.severity && touched.severity && <div id="feedback" style={{color:"red"}}>{errors.severity}</div>}
          </div>
          <div className="form-group">
          <label><h5>Status:</h5></label>
            <div className="form-control">
          <input type="radio" value="Open" id="Open"
             onInput={handlemodified} onChange={handleChange} name="status"/>
            <label for="Open">Open</label>

            <input type="radio" value="Closed" id="Closed"
             onInput={handlemodified} onChange={handleChange} name="status"/>
            <label for="Closed">Closed</label>

            <input type="radio" value="InProgress" id="InProgress"
             onInput={handlemodified} onChange={handleChange} name="status"/>
            <label for="InProgress">InProgress</label>
            </div>
            {errors.status && touched.status && <div id="feedback" style={{color:"red"}}>{errors.status}</div>}
          </div>
          <div className="form-group">
          <label><h5>Date Created:</h5></label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter IssueDescription"
              name="createddate"
              value={values.createddate}
              onChange={handleChange}
              onInput={handlemodified}
            />
            {errors.createddate && touched.createddate && <div id="feedback" style={{color:"red"}}>{errors.createddate}</div>}
          </div>
          <div className="form-group">
          <label><h5>Date Resolved:</h5></label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter IssueDescription"
              name="resolveddate"
              value={values.resolveddate}
              onChange={handleChange}
              onInput={handlemodified}
            />
            {errors.resolveddate && touched.resolveddate && <div id="feedback" style={{color:"red"}}>{errors.resolveddate}</div>}
          </div>
          <button className="btn btn-primary btn-block" type="submit">Add Issue</button>
          <button onClick={cancel} className="btn btn-danger btn-block">Cancel</button>
        </form>
      </div>
    </div>
</div>
   );
 };
 const MyEnhancedForm = withFormik({
   
   mapPropsToValues: () => ({ issuedescription: '' ,severity:'',status:'',createddate:'',resolveddate:'',count:0}),
   // Custom sync validation
   validate: values => {
     const errors = {};
 
     if (!values.issuedescription) {
       errors.issuedescription = 'Required';
     }
     if (!values.severity) {
      errors.severity = 'Required';
    }
    if (!values.status) {
      errors.status = 'Required';
    }
    if (!values.createddate) {
      errors.createddate = 'Required';
    }
    if (!values.resolveddate) {
      errors.resolveddate = 'Required';
    }
 
     return errors;
   },
   handleSubmit:(values, { setSubmitting }) => {
    setTimeout(() => {
      axios.post("http://localhost:3001/issues/",values)
      setSubmitting(false);
      
    }, 1000);
  },
   displayName: 'BasicForm',
   
 })(AddIssue);
 export default MyEnhancedForm