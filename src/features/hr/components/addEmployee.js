import Navbar from "../components/Navbar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../HR.css'
import { useEffect, useState } from "react";
import axios from "axios";


function AddEmployee() {
    
    const [jobTitle, setJobTitle] = useState([])
    const [managers,setManagers] = useState([])

    const [name,setName] = useState(null);
    const [city,setCity] = useState(null);
    const [salary,setSalary] = useState(null);
    const [jobTitleVal,setJobTitleVal] = useState(null);
    const [managerId,setManagerId] = useState(null);
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [msg,setMsg] = useState(null);

    useEffect(()=>{
        axios.get('http://localhost:8081/api/jobtype',{
            headers:{
                'Authorization' : 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp=>{
            console.log(resp.data)
            setJobTitle(resp.data)
        });

        axios.get('http://localhost:8081/api/manager/all',{
            headers:{
                'Authorization' : 'Basic ' + localStorage.getItem('token')
            }
        }).then(resp=>{
            setManagers(resp.data)
        });
    },[]);

    const addEmployee = ()=>{
        console.log(name);
        console.log(city);
        console.log(salary);
        console.log(jobTitleVal);
        console.log(managerId);
        console.log(username);
        console.log(password);
        let data = {
            "name": name,
            "city": city,
            "salary": salary,
            "jobTitle": jobTitleVal,
            "userInfo":{
                "username": username,
                "password": password
            }
        }

        axios.post('http://localhost:8081/api/employee/add/'+ managerId,
             data,
             {
                headers:{
                    'Authorization' : 'Basic ' + localStorage.getItem('token')
                }
            }
        ).then(resp=>{
             console.log(resp)
             setMsg('Employee Onboarded Successfully..')
        })
        .catch(err=>{
            console.log(err)
            setMsg('Employee Onboarding Failed.. please contact IT Admin')
        })

        window.scroll(0,0);
    }
    return(
        <div>
            <Navbar />
            <div className="container mt-4" style={{width: '50%'}}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Onboard Employee</h4>
                            </div>
                            <div className="card-body employee-form">
                                {
                                    msg === null?'':
                                    <div class="alert alert-primary" role="alert">
                                        {msg}
                                    </div>
                                }
                            
                                <div className="mb-3">
                                    <h4>Personal Info</h4>
                                </div>
                                <div class="mb-3">
                                    <label className="form-label">Enter Name: </label>
                                    <input type="text" class="form-control" placeholder="Enter full name" 
                                     onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <label className="form-label">Enter City: </label>
                                    <input type="text" class="form-control" placeholder="Enter city" 
                                     onChange={(e)=>setCity(e.target.value)} />
                                </div>
                                <div class="mb-3">
                                    <label className="form-label">Enter Salary: </label>
                                    <input type="number" class="form-control" placeholder="Enter salary" 
                                     onChange={(e)=>setSalary(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Select Job Title: </label>
                                    <select className="form-select" aria-label="Default select example" 
                                     onChange={(e)=>setJobTitleVal(e.target.value)}>
                                            <option selected> </option>
                                            {
                                                jobTitle.map((e,index)=>(
                                                    <option value={e} key={index}>{e}</option>
                                                ))
                                            }
                                            
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <h4>Assign Manager</h4>
                                </div>         
                                <div className="mb-3">
                                    <label className="form-label">Select Manager: </label>
                                    <select className="form-select" aria-label="Default select example" 
                                     onChange={(e)=>setManagerId(e.target.value)}>
                                            <option selected> </option>
                                            {
                                                managers.map((m,index)=>(
                                                    <option value={m.id} key={index}>{m.name}</option>
                                                ))
                                            }
                                            
                                    </select>
                                </div>      
                                <div className="mb-3">
                                    <h4>Employee Credentials</h4>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Username: </label>
                                    <input type="text" class="form-control" placeholder="Enter username" 
                                     onChange={(e)=>setUsername(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Password: </label>
                                    <input type="text" class="form-control" placeholder="Enter password" 
                                     onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={()=>addEmployee()}>Add Employee</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}
export default AddEmployee;