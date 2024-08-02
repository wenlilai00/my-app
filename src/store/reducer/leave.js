const intialState ={
  list: []
}

const leave = (state=intialState,action)=>{
    if(action.type === 'GET_ALL_LEAVES'){
      let temp = action.payload; 
      return {...state, list: [...temp]}
    }

    if(action.type === 'ADD_LEAVE'){
      let temp = action.payload; 
      let tempList = [...state.list]; //existing list
      tempList.push(temp); //list with new leave obj
      return {...state, list: [...tempList]}
    }

    if(action.type === 'DELETE_LEAVE'){
      let id = action.payload; 
       
      let tempList = [...state.list]; //existing list
      
      tempList = tempList.filter(l=>l.id !== id);
       
      return {...state, list: [...tempList]}
    }

    if(action.type === 'EDIT_LEAVE'){
      let newLeaveObj = action.payload; 
      let tempList = [...state.list]; //existing list
     
      //delete existing leave obj from the list 
      tempList = tempList.filter(l=>l.id !== newLeaveObj.id);

      //add new exited leave obj 
      tempList.push(newLeaveObj);

      return {...state, list: [...tempList]}
    }
  return state; 
}

export default leave;