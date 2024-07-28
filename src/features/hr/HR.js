import Navbar from "./components/Navbar";
import Dashboard from "./components/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../store/action/employee";

function HR(){
    // const dispatch = useDispatch();
    // dispatch(getEmployees())
    return(
        <div>
            <Navbar />
            <Dashboard />
            
            <div>
               
            </div>
        </div>
    )
}

export default HR; 