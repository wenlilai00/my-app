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

import { Nav } from 'react-bootstrap';
import HREmployee from './features/hr/components/hremployee';
import Leave from './features/hr/components/leave'
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
          <Route path="/leave" element={<Leave />} />
          <Route path="/manager" element={<Manager />}></Route>
          <Route path="/employee" element={<Employee />}></Route>
        {/* <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/leave" element={<Leave />} /> */}
        </Routes>
    </Provider>
    </div>
  );
}

export default App;
