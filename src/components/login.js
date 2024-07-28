import {  useState } from 'react';
import '../css/customer.css'
import axios from 'axios';

function Login(){
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [errorMsg,setErrorMsg] = useState('');
    const [user,setUser] = useState(null)
    const onLogin = ()=>{
        let token = window.btoa(username + ":" + password)
        axios.get('http://localhost:8081/api/login',{
            headers: {
                'Authorization': 'Basic ' + token
            }
        })
        .then(response=>{
            console.log(response.data);
            setUser(response.data)
            localStorage.setItem('token', token)
            localStorage.setItem('username',username)
            localStorage.setItem('role',user?.role)
            switch (user?.role) {
              case "HR":
                console.log("HR logged IN");
                break;
              case "EMPLOYEE":
                console.log("EMPLOYEE logged IN");
                break;
              case "MANAGER":
                console.log("MANAGER logged IN");
                break;
              default:
                break;
            }
        })
        .catch(error=>{
             setErrorMsg('Invalid Credentials')
        })
    }
    return (
        <div className="customer-container">
        <div className="customer-form">
          <div className='form-content'>
            <h1>Login</h1>
            <div>{errorMsg}</div>
            <label>Enter username: </label>
            <input type="text" onChange={(e)=>setUsername(e.target.value) }/> 
            
            <br /><br />
            <label>Enter Password: </label>
            <input type="text" onChange={(e)=>setPassword(e.target.value)}/>
            
            <br /><br />

             <button onClick={()=>onLogin()}>LOGIN</button> 
             
          </div>
        </div>
      </div>
    )
}

export default Login;