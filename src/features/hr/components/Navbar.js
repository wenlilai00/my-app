import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

function NavBar({searchFn}) {

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
        <Navbar.Brand href="/">Capstone Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-container">
            <Nav.Link><Link to={"/hr"}>Dashboard</Link></Nav.Link>
            <Nav.Link><Link to={"/employee"}>Employee</Link></Nav.Link>
            <Nav.Link><Link to={"/leave"}>Leave</Link></Nav.Link>

            <Form className="d-flex">
             <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText 
                  placeholder="Search" 
                  onSubmit={(e)=>upStateSearch(e)}
                  onChange={(e)=> setSearchStr(e.target.value)}
                  sx={{
                    marginLeft: "40%"
                  }}
                />
              </IconField>
    
          </Form>

          <NavDropdown 
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

export default NavBar;