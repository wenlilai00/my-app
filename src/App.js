import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HR from './features/hr/HR';
// import Employee from './features/hr/Employee';
// import Leave from './features/hr/Leave';
import Login from './auth/login';
import Manager from "./features/manager/manager";
import Employee from './features/employee/employee';
import LeaveDetails from './features/employee/components/leaveDetails';
import LeaveDetailsManager from './features/manager/components/leaveDetails';
import SendPayslip from './features/hr/components/leave';

import { Nav } from 'react-bootstrap';
import HREmployee from './features/hr/components/hremployee';
import Projects from './features/hr/components/project'
import AddEmployee from './features/hr/components/addEmployee';
import store from "./store";
import { Provider } from 'react-redux';


// const router = createBrowserRouter ([
//   {
//     element: <Navbar />,
//     children: [
//       {
//         path: "/",
//         element: <Login />
//       },
//       {
//         path: "/",
//         element: <Dashboard />
//       },
//       {
//         path: "/employee",
//         element: <Employee />
//       },
//       {
//         path: "/leave",
//         element: <Leave />
//       }
//     ]
//   }
// ])
function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/hr" element={<HR/>} />
          <Route path="/hremployee" element={<HREmployee/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/manager" element={<Manager />}></Route>
          <Route path="/employee" element={<Employee />}></Route>
          <Route path="/employee-leave" element={<LeaveDetails />}></Route>
          <Route path="/manager-leave-details" element={<LeaveDetailsManager />}></Route>
          <Route path="/hr-send-payslip" element={<SendPayslip/>}></Route>
        {/* <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/leave" element={<Leave />} /> */}
        </Routes>
    </Provider>
    </div>
  );
}

export default App;
