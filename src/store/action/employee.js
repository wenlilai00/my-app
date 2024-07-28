import axios from "axios"

export const getEmployees=()=>(dispatch)=>{
    //call the api 
    axios.get('http://localhost:8081/api/manager/employee',{
        headers: {
            'Authorization': 'Basic ' + localStorage.getItem('token')
        }
    })
    
    .then(response=>{
        let action = {
            type: 'GET_ALL_EMPLOYEE',
            payload: response.data
        };

        dispatch(action)
    })
}