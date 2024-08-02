
import { useEffect } from "react";
import Navbar from "./components/navbar.js";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../store/action/employee";
import EmployeeList from "./components/employeeList.js";

function Manager(){
    const dispatch = useDispatch();
    dispatch(getEmployees())
    return (
        <div>
            <Navbar />
            <EmployeeList />
        </div>
    )
}

export default Manager; 