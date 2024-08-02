import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Navbar from './Navbar';
import '../HR.css';
import axios from 'axios';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

function HREmployee() {
    const { list } = useSelector((state) => state.employee);
    const [data, setData] = useState([...list]);
    const [filters, setFilters] = useState({
        name: { value: null, matchMode: 'contains' },
        city: { value: null, matchMode: 'equals' },
        salary: { value: null, matchMode: 'equals' }
    });
    const [jobTitle, setJobTitle] = useState([]);
    const [managers, setManagers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [salary, setSalary] = useState('');
    const [jobTitleVal, setJobTitleVal] = useState('');
    const [managerId, setManagerId] = useState('');
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [isMessageDialogVisible, setIsMessageDialogVisible] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [taskDetails,setTaskDetails] = useState('');
    const [employee,setEmployee] = useState({});
    const toast = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8081/api/jobtype', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => setJobTitle(resp.data))
        .catch(error => console.error('Error fetching job types:', error));

        axios.get('http://localhost:8081/api/manager/all', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => setManagers(resp.data))
        .catch(error => console.error('Error fetching managers:', error));

        axios.get('http://localhost:8081/api/employee/getall', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setEmployees(resp.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching employee data:', error);
            setLoading(false);
        });
    }, []);

    const handleFormSubmit = () => {
        const data = {
            name: name,
            city: city,
            contact: contact,
            username: username,
            salary: salary,
            jobTitle: jobTitleVal,
            userInfo: {
                username: username,
                password: password
            }
        };

        if (isEdit) {
            axios.put(`http://localhost:8081/api/employee/edit/${selectedEmployeeId}`, data, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem('token')
                }
            })
            .then(resp => {
                setMsg('Employee Updated Successfully.');
                const updatedEmployees = employees.map(emp => emp.id === selectedEmployeeId ? resp.data : emp);
                setEmployees(updatedEmployees);
                resetForm();
                setVisible(false);
            })
            .catch(err => {
                console.error('Error during employee update:', err.response || err);
                setMsg('Employee Update Failed.. please contact IT Admin');
            });
        } else {
            axios.post(`http://localhost:8081/api/employee/add/${managerId}`, data, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem('token')
                }
            })
            .then(resp => {
                setMsg('Employee Onboarded Successfully.');
                setEmployees([...employees, resp.data]);
                resetForm();
                setVisible(false);
            })
            .catch(err => {
                console.error('Error during employee onboarding:', err.response || err);
                setMsg('Employee Onboarding Failed.. please contact IT Admin');
            });
        }
    };

    const loadEmployeeData = (employee) => {
        setName(employee.name);
        setCity(employee.city);
        setSalary(employee.salary);
        setJobTitleVal(employee.jobTitle);
        setManagerId(employee.managerId);
        setUsername(employee.username);
        setContact(employee.contact);
        setPassword(employee.userInfo.password);
        setSelectedEmployeeId(employee.id);
        setIsEdit(true);
        setVisible(true);
    };

    const resetForm = () => {
        setName('');
        setCity('');
        setSalary('');
        setJobTitleVal('');
        setManagerId('');
        setUsername('');
        setContact('');
        setPassword('');
        setIsEdit(false);
        setSelectedEmployeeId(null);
    };

    const confirmDeleteEmployee = (employee) => {
        setEmployeeToDelete(employee);
        setDeleteDialogVisible(true);
    };

    const deleteEmployee = () => {
        axios.delete(`http://localhost:8081/api/employee/delete/${employeeToDelete.id}`, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setMsg('Employee Deleted Successfully.');
            setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id));
            setDeleteDialogVisible(false);
            setEmployeeToDelete(null);
        })
        .catch(err => {
            console.error('Error during employee deletion:', err.response || err);
            setMsg('Employee Deletion Failed.. please contact IT Admin');
        });
    };

    const assignTask = () => {
        if (!selectedEmployee) return;

        let empId = selectedEmployee.id;
        let data = {
            'taskDetails': messageContent
        };

        axios.post(`http://localhost:8081/api/task/employee/${empId}`, data, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setMsg(`Task assigned to ${selectedEmployee.name} successfully.`);
            toast.current.show({ severity: 'success', summary: 'Success', detail: `Message sent to ${selectedEmployee.name}`, life: 3000 });
            setMessageContent('');
            setIsMessageDialogVisible(false);
        })
        .catch(err => {
            console.error('Error during task assignment:', err.response || err);
            setMsg('Operation Failed, please contact Admin');
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to send message.', life: 3000 });
        });
    };

    const combinedData = [
        ...employees.map(emp => ({ ...emp, type: 'Employee' })),
        ...managers.map(manager => ({ ...manager, type: 'Manager' }))
    ];

    const header = <div className="table-header">List of Employees and Managers</div>;

    const cityRowFilter = (
        <input
            type="text"
            placeholder="Search by City"
            onChange={(e) => {
                let value = e.target.value;
                let _filters = { ...filters };
                _filters['city'].value = value;
                setFilters(_filters);
            }}
        />
    );

    // handling the delete, update, send
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button 
                    icon="pi pi-pencil" 
                    className="background p-mr-2" 
                    onClick={() => loadEmployeeData(rowData)} 
                    tooltip="Edit"
                    tooltipOptions={{ position: 'top' }}
                />
                <Button 
                    icon="pi pi-trash" 
                    className="background" 
                    onClick={() => confirmDeleteEmployee(rowData)} 
                    tooltip="Delete"
                    tooltipOptions={{ position: 'top' }}
                />
                <Button 
                    icon="pi pi-send" 
                    className="background" 
                    onClick={() => {
                        setSelectedEmployee(rowData);
                        setIsMessageDialogVisible(true);
                    }} 
                    tooltip="Send"
                    tooltipOptions={{ position: 'top' }}
                />
            </React.Fragment>
        );
    };

    return (
        <>
            <Navbar />
            <Toast ref={toast} />
            {msg && <div className="alert alert-success">{msg}</div>}
            <div className="">
                <Button 
                    label="Add Employee" 
                    icon="pi pi-user-plus" 
                    size='large'
                    onClick={() => {
                        resetForm();
                        setVisible(true);
                    }}
                    className='addBtn-btn ml-0'
                />
                <Dialog header={isEdit ? "Edit Employee" : "Add Employee"} visible={visible} style={{ width: '50vw' }} onHide={() => {
                    resetForm();
                    setVisible(false);
                }}>
                    <div className="mt-3 mb-2">
                        <div className="mb-3">
                            <label className="form-label">Enter Name: </label>
                            <input type="text" className="form-control" placeholder="Enter full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter City: </label>
                            <input type="text" className="form-control" placeholder="Enter city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Salary: </label>
                            <input type="number" className="form-control" placeholder="Enter salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select Job Title: </label>
                            <select className="form-select" aria-label="Default select example"
                                value={jobTitleVal}
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
                            <label className="form-label">Select Manager: </label>
                            <select className="form-select" aria-label="Default select example"
                                value={managerId}
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
                            <label className="form-label">Enter Username: </label>
                            <input type="text" className="form-control" placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Password: </label>
                            <input type="text" className="form-control" placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="card-footer">
                            <Button label={isEdit ? "Update" : "Add"} icon="pi pi-check" className="addbtn btn-danger" onClick={handleFormSubmit} />
                            <Button label="Cancel" icon="pi pi-times" size='small' onClick={() => {
                                resetForm();
                                setVisible(false);
                            }} className='btn btn-secondary ml-2' />
                        </div>
                    </div>
                </Dialog>
                <Dialog header="Confirm Deletion" visible={deleteDialogVisible} style={{ width: '30vw' }} onHide={() => setDeleteDialogVisible(false)}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-4" style={{ fontSize: '1.5rem'}} />
                        {employeeToDelete &&  <span> Are you sure you want to delete <b>{employeeToDelete.name}</b>?</span>}
                    </div>
                    <div className="p-dialog-footer">
                        <Button label="No" icon="pi pi-times" style={{ color: 'red' }} className="p-button-text" onClick={() => setDeleteDialogVisible(false)} />
                        <Button label="Yes" icon="pi pi-check" style={{ color: 'green' }} className="p-button-text" onClick={deleteEmployee} />
                    </div>
                </Dialog>
                <Dialog header="Send Message" visible={isMessageDialogVisible} style={{ width: '50vw' }} onHide={() => setIsMessageDialogVisible(false)}>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="messageContent">Message Content</label>
                            <InputTextarea
                                id="messageContent"
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                                rows={5}
                                cols={88}
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="employeeName">To: {selectedEmployee?.name}</label>
                        </div>
                        <div className="p-dialog-footer">
                            <Button label="Send" icon="pi pi-check" onClick={assignTask} />
                            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setIsMessageDialogVisible(false)} />
                        </div>
                    </div>
                </Dialog>
            </div>
            <div className="card">
                <DataTable
                    value={combinedData}
                    rows={10}
                    tableStyle={{ 
                        minWidth: '50rem',
                        marginBottom:"-40px"
                    }}
                    dataKey="id"
                    filters={filters}
                    filterDisplay="row"
                    loading={loading}
                    header={header}
                    emptyMessage="No employees found."
                >
                    <Column field="id" header="System ID" style={{ minWidth: "25%" }} />
                    <Column
                        field="name"
                        header="Name"
                        filterPlaceholder="Search by name"
                        sortable style={{ minWidth: "25%" }}
                    />
                    <Column
                        field="city"
                        header="City"
                        filterPlaceholder="Search by City"
                        filterElement={cityRowFilter}
                        sortable style={{ minWidth: "25%" }}
                    />
                    <Column
                        field="salary"
                        header="Salary"
                        filterField="salary"
                        sortable style={{ minWidth: "25%" }}
                        filterPlaceholder="Search by job Title"
                    />
                    <Column
                        field="jobTitle"
                        header="Job Title"
                        filterField="jobTitle"
                        sortable style={{ minWidth: "25%" }}
                        filterPlaceholder="Search by job Title"
                    />
                    <Column header="Action" body={actionBodyTemplate} />
                </DataTable>
            </div>
        </>
    );
}

export default HREmployee;




        