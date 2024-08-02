import axios from "axios"

export const getLeaves=()=>(dispatch)=>{
    // //call the api 
    // axios.get('http://localhost:8081/api/leave/all',{
    //     headers: {
    //         'Authorization': 'Basic ' + localStorage.getItem('token')
    //     }
    // })
    
    // .then(response=>{
    //     let action = {
    //         type: 'GET_ALL_LEAVES',
    //         payload: response.data
    //     };

    //     dispatch(action)
    // })

let action = {
            type: 'GET_ALL_LEAVES',
            payload: []
        };

        dispatch(action)
}

export const deleteLeave=(id)=>(dispatch)=>{
    //call api here 
    let action = {
        type: 'DELETE_LEAVE',
        payload: id
    };

    dispatch(action)
}

export const editLeaves=(leave)=>(dispatch)=>{
    //edit api 
    let action = {
        type: 'EDIT_LEAVE',
        payload: leave
    };

    dispatch(action)
}

export const addLeaves=(leave)=>(dispatch)=>{
    //add leave
    let action = {
        type: 'ADD_LEAVE',
        payload: leave
    };

    dispatch(action)
}