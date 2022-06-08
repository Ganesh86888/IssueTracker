import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Tooltip,ResponsiveContainer,PieChart,Pie,BarChart,Bar,CartesianGrid,XAxis,YAxis,Legend} from "recharts";

const Chart=(props)=>{
  const [user, setUser] = useState([])
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const result = await axios.get("http://localhost:3001/issues");
    setUser(result.data.reverse());
  };  
  //let countvalue=this.props.user.count
  //console.log(countvalue)
  console.log(user)
  const filteredlist=user.filter(issue=>{
    return issue.count>=3
  })
  let title=filteredlist.map(issue=>{
    return issue.issuedescription
  })
  let count=filteredlist.map(issue=>{
    return issue.count
  })
  console.log(title)
  console.log(count)
    const data=[
        {name:title[0],value:count[0]},
        {name:title[1],value:count[1]},
        {name:title[2],value:count[2]}
       
    ]

    return(
        <div className="container">
          <div className="col-md-6">
          <h2>Bar chart Based on number of views</h2><br/><br/>
   
          <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
        </PieChart>
       
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
   
      
        </div>
        </div>
    );
}
export default Chart