import axios from "axios";
import { useState } from "react";
import './login.css'
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBCheckbox } from 'mdb-react-ui-kit';


function Login(){
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [errorMsg,setErrorMsg] = useState('');
    const navigate = useNavigate();
    const [param] = useSearchParams();
    const [msg,setMsg] = useState(param.get('msg'));

    const onLogin = ()=>{
        let token = window.btoa(username + ":" + password)
        axios.get('http://localhost:8081/api/login',{
            headers: {
                'Authorization': 'Basic ' + token
            }
        })
        .then(response=>{
            console.log(response.data);
            let user = {
              'userid': response.data.id,
              'token': token,
              'username': username,
              'role': response.data.role
            }
            
            localStorage.setItem('token', token)
            localStorage.setItem('username',username)
            localStorage.setItem('role',user.role)
            localStorage.setItem('userid',user.userid)

          
            
            if(user.role === 'HR'){
              navigate('/hr');
              return; 
            }
            else
            if(user.role === 'MANAGER') {
              navigate('/manager');
              return
            }
            else
            if(user.role === 'EMPLOYEE') {
              navigate('/employee');
              return
            }
            
            
        })
        .catch(error=>{
             setErrorMsg('Invalid Credentials')
        })
    }
    return (
      <>
      <div className="project-title">
      <h1>Capstone Project</h1>
      </div>
      <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>


          <MDBCard className='my-5 mx-auto' style={{borderRadius: '1rem',  backgroundColor: "#5093eb", maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>


              <h4 className=" mt-1 mb-4 text-center">Sign in</h4>
              {/* <p className="text-white-50 mb-3">Please enter your login and password!</p> */}

              <div>{errorMsg}</div>
                {
                  msg === "" || msg === undefined || msg === null?'':<div class="alert alert-dark" role="alert">
                  You have logged Out
              </div>
                }
              {/* <label>Email address</label> */}
              <MDBInput wrapperClass='mb-4 w-100' placeholder="Email" type='email' size="lg"
              onChange={(e)=>setUsername(e.target.value) }/>
              
              <MDBInput wrapperClass='mb-4 w-100' placeholder="Password"  type='password' size="lg"
              onChange={(e)=>setPassword(e.target.value)}/>
                
              <button className='login-btn' variant="primary" onClick={()=>onLogin()}>LOGIN</button> 

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </>

    )
}

export default Login;