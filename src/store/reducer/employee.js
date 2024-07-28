const intialState ={
  list: []
}

const employee = (state=intialState,action)=>{
    if(action.type === 'GET_ALL_EMPLOYEE'){
      let temp = action.payload; 
      return {...state, list: temp}
    }

  return state; 
}

export default employee;