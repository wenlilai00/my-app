import { useEffect, useState } from "react";
import Navbar from "./navbar";
  import axios from "axios";
 function LeaveDetailsManager(){
    
     const [leaves,setLeaves] = useState([]);
    
    useEffect(()=>{
         axios.get('http://localhost:8081/api/manager/leave/all',{
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
         })
         .then(resp=>{
            setLeaves(resp.data.sort((a,b)=>a.id - b.id));
         })

    },[]);

      
    const onStatusUpdate = (id,status) =>{
        axios.get('http://localhost:8081/api/leave/update/' + id +'/'+status,{
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        }).then(resp=>{
             let arry = [...leaves.filter(l=>l.id !== id)]; 
             arry.push(resp.data)
             setLeaves([...arry].sort((a,b)=>a.id - b.id))
        })
    }
    return (
        <div>
            <Navbar />
            <div className="container">
                
                {
                    leaves.map((l,index)=>(
                        <div className="row mt-4" key={index}>
                            <div className="col-lg-12"> 
                                <div className="card">
                                    <div className="card-header">
                                        <span>Start Date: {l.startDate}</span>
                                        &nbsp; &nbsp; &nbsp;
                                        <span>End Date: {l.endDate}</span>
                                        &nbsp; &nbsp; &nbsp;
                                        <span>
                                            Status: {l.status}
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <span>Number fo Days Requested: {l.noOfDays}</span>
                                        <br />
                                        <p>
                                            {l.reason}
                                        </p>
                                        <p>
                                            Employee Name:  {l.employee.name}
                                        </p>
                                        <p>
                                            JobTitle:  {l.employee.jobTitle}
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-warning" onClick={()=>onStatusUpdate(l.id,'APPROVE')}>APPROVE</button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button className="btn btn-danger" onClick={()=>onStatusUpdate(l.id,'DENY')} >DENY</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LeaveDetailsManager;