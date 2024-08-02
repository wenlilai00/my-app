import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import './navbar.css';

function EmployeeNavbar({searchFn}) {

    const [searchStr,setSearchStr] = useState();
    const navigate = useNavigate();
  
    const upStateSearch = (e)=>{
      e.preventDefault();
      searchFn(searchStr)
    }
  
    const logout = ()=>{
      localStorage.clear();
      navigate('/?msg=looged_out')
    }

    return (
        <Navbar expand="lg" className="nav-box">
          <Container>
            <Navbar.Brand href="/employee">Capstone Project</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="navbar-container">
                <Nav.Link><Link className="nav-link" to={"/employee"}>Dashboard</Link></Nav.Link>
                {/* <Nav.Link><Link className="nav-link" to={"/payroll"}>Payroll</Link></Nav.Link> */}
                <Nav.Link><Link className="nav-link"  to={"/employee-leave"}>Leave</Link></Nav.Link>
    
    
              <NavDropdown className="nav-right"
                title={
                  <Avatar 
                    icon="pi pi-user" 
                    className="logout-btn mr-2" 
                    size="mdium"
                    shape="circle" 
                  />
                } 
                id="basic-nav-dropdown"
                alignRight
                style={{ marginRight: '30px' }}  
              >
                  <NavDropdown.Item>
                  <span>{localStorage.getItem('username')} &nbsp;&nbsp;&nbsp;</span>
                  </NavDropdown.Item>
                  &nbsp;&nbsp;
                  <NavDropdown.Item icon="pi-sign-out" onClick={logout}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
    
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}
export default EmployeeNavbar;