import { useState } from "react";
import EmployeeBoard from "./components/employeeBoard";
import EmployeeNavbar from "./components/navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getLeaves } from "../../store/action/leave";

function Employee() {
    const [employee, setEmployee] = useState({});
    const dispatch = useDispatch();

    // Function to initialize data
    const initializeData = async () => {
        dispatch(getLeaves());

        try {
            const resp = await axios.get(`http://localhost:8081/api/employee/getid/${localStorage.getItem("userid")}`, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem("token"),
                },
            });
            localStorage.setItem("id", resp.data.id);
            setEmployee(resp.data);
            console.log(resp.data);
        } catch (error) {
            console.error("Failed to fetch employee data:", error);
        }
    };

    // Call the initialization function
    initializeData();

    return (
        <div>
            <EmployeeNavbar />
            {employee.id ? <EmployeeBoard /> : ""}
        </div>
    );
}

export default Employee;
