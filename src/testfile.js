import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../HR.css';
import {
    Box,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Employee() {
    const [show, setShow] = useState(false);
    const [addemployee, setAddEmployee] = useState(false);
    const [updateemployee, setUpdateEmployee] = useState(false);
    const [deleteemployee, setDeleteEmployee] = useState(false);
    const [deleteall, setDeleteAll] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [jobTitle, setJobTitle] = useState([]);
    const [managers, setManagers] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [salary, setSalary] = useState('');
    const [jobTitleVal, setJobTitleVal] = useState('');
    const [managerId, setManagerId] = useState('');
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/api/jobtype', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            console.log(resp.data);
            setJobTitle(resp.data);
        });

        axios.get('http://localhost:8081/api/manager/all', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        }).then(resp => {
            setManagers(resp.data);
        });

        axios.get('http://localhost:8081/api/employee/getall', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setEmployees(resp.data);
        })
        .catch(error => {
            console.error('Error fetching employee data:', error);
        });
    }, []);

    const addEmployee = () => {
        console.log(name);
        console.log(city);
        console.log(salary);
        console.log(jobTitleVal);
        console.log(managerId);
        console.log(username);
        console.log(password);
        let data = {
            "name": name,
            "city": city,
            "contact": contact,
            "username": username,
            "salary": salary,
            "jobTitle": jobTitleVal,
            "userInfo": {
                "username": username,
                "password": password
            }
        }

        axios.post('http://localhost:8081/api/employee/add/' + managerId, data, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        }).then(resp => {
            console.log(resp);
            setMsg('Employee Onboarded Successfully..');
            setEmployees([...employees, resp.data]);
        })
        .catch(err => {
            console.log(err);
            setMsg('Employee Onboarding Failed.. please contact IT Admin');
        });

        window.scroll(0, 0);
    }

    return (
        <div>
            <Navbar />
            <div className="mt-5 mb-2">
                <Button onClick={() => setAddEmployee(true)} className="buttons-employee" variant="" size="sm">
                    Add Employee
                </Button>
                <Button onClick={() => setUpdateEmployee(true)} className="buttons-employee" variant="" size="sm">
                    Update Employee
                </Button>
                {/* <Button onClick={() => setDeleteEmployee(true)} className="buttons-employee" variant="" size="sm">
                    Delete Employee
                </Button>
                <Button onClick={() => setDeleteAll(true)} className="buttons-employee" variant="" size="sm">
                    Delete All
                </Button> */}

                <Modal
                    size="lg"
                    show={addemployee}
                    onHide={() => setAddEmployee(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="mb-3">
                            <h4>Personal Info</h4>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Name: </label>
                            <input type="text" className="form-control" placeholder="Enter full name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter City: </label>
                            <input type="text" className="form-control" placeholder="Enter city"
                                onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Salary: </label>
                            <input type="number" className="form-control" placeholder="Enter salary"
                                onChange={(e) => setSalary(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select Job Title: </label>
                            <select className="form-select" aria-label="Default select example"
                                onChange={(e) => setJobTitleVal(e.target.value)}>
                                <option selected> </option>
                                {
                                    jobTitle.map((e, index) => (
                                        <option value={e} key={index}>{e}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <h4>Assign Manager</h4>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select Manager: </label>
                            <select className="form-select" aria-label="Default select example"
                                onChange={(e) => setManagerId(e.target.value)}>
                                <option selected> </option>
                                {
                                    managers.map((m, index) => (
                                        <option value={m.id} key={index}>{m.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <h4>Employee Credentials</h4>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Username: </label>
                            <input type="text" className="form-control" placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Password: </label>
                            <input type="text" className="form-control" placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => addEmployee()}>Add Employee</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    size="lg"
                    show={updateemployee}
                    onHide={() => setUpdateEmployee(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Update Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <h4>Personal Info</h4>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Name: </label>
                            <input type="text" className="form-control" placeholder="Enter full name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter City: </label>
                            <input type="text" className="form-control" placeholder="Enter city"
                                onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Salary: </label>
                            <input type="number" className="form-control" placeholder="Enter salary"
                                onChange={(e) => setSalary(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select Job Title: </label>
                            <select className="form-select" aria-label="Default select example"
                                onChange={(e) => setJobTitleVal(e.target.value)}>
                                <option selected> </option>
                                {
                                    jobTitle.map((e, index) => (
                                        <option value={e} key={index}>{e}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <h4>Assign Manager</h4>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select Manager: </label>
                            <select className="form-select" aria-label="Default select example"
                                onChange={(e) => setManagerId(e.target.value)}>
                                <option selected> </option>
                                {
                                    managers.map((m, index) => (
                                        <option value={m.id} key={index}>{m.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <h4>Employee Credentials</h4>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Username: </label>
                            <input type="text" className="form-control" placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Password: </label>
                            <input type="text" className="form-control" placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            <div className='all-employee mt-5 mb-0'>
                <h3>Employee Management</h3>
            </div>

            <Table className='employee-table' striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Salary</th>
                        <th>Job Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.id}>
                            <td>{index + 1}</td>
                            <td>{employee.name}</td>
                            <td>{employee.username}</td>
                            <td>{employee.contact}</td>
                            <td>{employee.city}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.jobTitle}</td>
                            <td>
                                <Box sx={{ display: 'flex', gap: '1rem' }}>
                                    <Tooltip title="Edit">
                                    <IconButton onClick={() => table.setEditingRow(row)}>
                                        <EditIcon />
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    </Tooltip>
                                </Box>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Employee;