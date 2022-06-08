import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {Button, Form} from 'react-bootstrap'
import './Home.css'

const Home = (props) => {
  const history=useHistory();
  const [users, setUser] = useState([]);
  const[searchArray,setsearchArray]=useState('');
  const[local,setlocal]=useState(false);
  const[Severity,setSeverity]=useState(true);
  const[Status,setStatus]=useState(true);
  const[Date,setDate]=useState(true);
  const[Rdate,setRdate]=useState(true);
  
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3001/issues");
    console.log(result);
    setUser(result.data.reverse());
    if(localStorage.getItem('data')){
      setlocal(true);
    }
  };
  const loadUser = async id => {
    console.log(id)
    const res = await axios.get(`http://localhost:3001/issues/${id}`);
    setUser(res.data);
  };
  const filtereddata=users.filter(user=>{
    return user.issuedescription.toLowerCase().includes(searchArray.toLowerCase())
  })

  function addissue(){
    console.log(local);
      if(local){
         return(history.push('/users/add'))
      }else{
        alert("you are not signed in,you need to signIn")
        return(history.push('/login'))

      }
  }
  function updateissue(id){
    if(local){
      return(history.push(`/users/edit/${id}`))
    }else{
      alert("you are not signed in,you need to signIn")
      return(history.push('/login'))
    }
  }

  const deleteUser = async id => {

    if(local){
      alert("are you want to delete the issues")
      await axios.delete(`http://localhost:3001/issues/${id}`);
    loadUsers();
    }
    else{
      alert("you are not signed in,you need to signIn")
      return(history.push('/login'))
    }
    
  };
  function view(id){
    if(local){
      history.push(`/viewissues/${id}`);
    }else{
      alert("you are not signed in,you need to signIn")
      return(history.push('/login'))
    }
    
  }

  return (
    <div className="Home">
      <div className="card-body">
        <h1 className="card-title">View Issue Details</h1>
        <div className="container"><br/>
    <input type="text" placeholder="search for.." onChange={e=>setsearchArray(e.target.value)}/><br/><br/>
    <Button className="btn btn-primary" onClick={()=>addissue()}>Add Issue</Button>
    <div className="container">
    <form>
            <input type="checkbox" label="severity" inline value={users.severity} onChange={()=>setSeverity(!Severity)}/>&nbsp;
            <label htmlFor="severity"><b>severity</b></label>&nbsp;
            <input type="checkbox" label="status" inline value={users.status} onChange={()=>setStatus(!Status)}/>
            <label htmlFor="status"><b>status</b></label>&nbsp;
            <input type="checkbox" label="date" inline value={users.date} onChange={()=>setDate(!Date)}/>
            <label htmlFor="createddate"><b>Created Date</b></label>&nbsp;
            <input type="checkbox" label="rdate" inline value={users.rdate} onChange={()=>setRdate(!Rdate)}/>
            <label htmlFor="resolveddate"><b>Resolved Date</b></label>&nbsp;
            </form>
            </div>
<br/>
    </div>
      <section className="bg-blue-900 grid grid-cols-1 gap-10 px-10 py-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:px-20">
    
      {filtereddata.map((issue) => {
      
        const {
          id,
          issuedescription,
          severity,
          status,
          createddate,
          resolveddate,
        } = issue

        return (

          
          <div key={id} className="bg-gray-800 p-4 rounded">
            <h2 className="font-bold text-yellow-400 text-3xl mb-4">
               <span className="font-light">{issuedescription}</span>
            </h2>
          
            <ul>
              <li className="flex justify-between my-2 text-red-300">
                <span className="font-bold"></span>{' '}
                {Severity?null:<h5>Severity:{issue.severity}</h5>}
              </li>
              <li className="flex justify-between my-2 text-blue-300">
              <span className="font-bold"></span>{' '}
                {Status?null:<h5>Status:{issue.status}</h5>}
              </li>
              <li className="flex justify-between my-2 text-yellow-300">
                <span className="font-bold"></span>
                {Date?null:<h5>Created Date:{issue.createddate}</h5>}
              </li>
              <li className="flex justify-between my-2 text-purple-300">
                <span className="font-bold"></span>
              {Rdate?null:<h5>Resolved Date: {issue.resolveddate}</h5>}
        </li>
              
                <Button className="btn btn-warning" onClick={()=>view(id)} >
                  view Issue
                </Button>&nbsp;
              <Button
                    className="btn btn-warning mr-2"
                    
                    onClick={()=>updateissue(id)}
                  >
                    Update Issue
                  </Button>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteUser(id)}
                  >
                    Delete Issue
                  </Link>
            
             </ul>
            
          </div>
        
        )
      })}
    </section>
        
      </div>
    </div>
  
  );
};

export default Home;
