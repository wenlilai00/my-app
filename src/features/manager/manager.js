
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../store/action/employee";
import EmployeeList from "./components/employeeList.js";

function Manager(){
    const dispatch = useDispatch();
    dispatch(getEmployees())
    return (
        <div>
            <EmployeeList />
        </div>
    )
}

export default Manager; 