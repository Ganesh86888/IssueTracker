
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams, Link ,Prompt} from "react-router-dom";
import {ErrorMessage, Field,Form, Formik} from 'formik'
import * as Yup from 'yup'
import './back.css'
const UpdateIssue = () => {
  let history = useHistory();
  const { id } = useParams();
  const[modified,setModified]=useState(false);
  const [user, setUser] = useState([]);

  const initialValues={
    issuedescription:user.issuedescription,
    severity:user.severity,
    status:user.status,
    createddate:user.createddate,
    resolveddate:user.resolveddate,
    count:user.count
  }
  console.log(initialValues)
  

  useEffect(() => {
    loadUser();
  }, []);
  function handlemodified(){
    setModified(true);
  }
  
  function cancel(){
    alert("are you sure you want to cancel");
    history.push("/")
  }
  function handlemodified(){
    setModified(true);
    console.log(modified)
  }
const handleUpdate=(values)=>{
  axios.put(`http://localhost:3001/issues/${id}`,values)
  .then(res=>{
    console.log(res.data)
  })
  history.push("/")
}
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3001/issues/${id}`);
    setUser(result.data);
  };
  return (
    <div >
    <div className="container">
      <div className="w-75 mx-auto shadow p-5 background">
        <h2 className="text-center mb-4">Update Issue Page</h2>
      <Formik 
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleUpdate}
      enableReinitialize>

<Form>
        <div className="form-group">
          <label><h5>IssueDescription:</h5></label>
            <Field
              type="text"
              className="form-control"
              placeholder="Enter IssueDescription"
              name="issuedescription"
              
              onInput={handlemodified}
            />
            <Prompt when={modified} message="Are you sure you want to leave ?" />
            <ErrorMessage name="issuedescription">
              {
              (errorMsg)=> <div style={{color:'red'}} >{errorMsg}</div>
              }
            </ErrorMessage>
          </div>
          <div className="form-group">
          <label><h5>Severity:</h5></label>
            <Field as="select" className="form-control"  name="severity" onInput={handlemodified}>
              <option value="Minor">Minor</option>
              <option value="Major">Major</option>
              <option value="Critical">Critical</option>
            </Field>
            <ErrorMessage name="severity">
              {
              (errorMsg)=> <div style={{color:'red'}} >{errorMsg}</div>
              }
            </ErrorMessage>
          </div>
          <div className="form-group">
          <label><h5>Status:</h5></label>
            <div className="form-control">
          <Field type="radio" value="Open" id="Open"
               name="status" onInput={handlemodified}/>
            <label for="Open">Open</label>

            <Field type="radio" value="Closed" id="Closed"
               name="status" onInput={handlemodified}/>
            <label for="Closed">Closed</label>

            <Field type="radio" value="InProgress" id="InProgress"
               name="status" onInput={handlemodified}/>
            <label for="InProgress">InProgress</label>
            <ErrorMessage name="status">
              {
              (errorMsg)=> <div style={{color:'red'}} >{errorMsg}</div>
              }
            </ErrorMessage>
            </div>
          </div>
          <div className="form-group">
          <label><h5>Date Created:</h5></label>
            <Field
              type="date"
              className="form-control"
              placeholder="Enter IssueDescription"
              name="createddate"
              onInput={handlemodified}
            />
            <ErrorMessage name="createddate">
              {
              (errorMsg)=> <div style={{color:'red'}} >{errorMsg}</div>
              }
            </ErrorMessage>
          </div>
          <div className="form-group">
          <label><h5>Date Resolved:</h5></label>
            <Field
              type="date"
              className="form-control"
              placeholder="Enter IssueDescription"
              name="resolveddate"
              onInput={handlemodified}
            />
            <ErrorMessage name="resolveddate">
              {
              (errorMsg)=> <div style={{color:'red'}} >{errorMsg}</div>
              }
            </ErrorMessage>
          </div>
         
          <button className="btn btn-warning btn-block">Update Issue</button>
          <button onClick={cancel} className="btn btn-danger btn-block">Cancel</button>
        </Form>


      </Formik>



        
      </div>
    </div>
    </div>
  );
};
const validationSchema=Yup.object({
  issuedescription:Yup.string().required('required'),
  severity:Yup.string().required('required'),
  status:Yup.string().required('required'),
  createddate:Yup.string().required('required'),
  resolveddate:Yup.string().required('required'),
})

export default UpdateIssue;
