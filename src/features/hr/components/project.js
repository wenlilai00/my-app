import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from './Navbar';
import '../HR.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';

function Projects() {
    const { list } = useSelector((state) => state.employee);
    const [employees, setEmployees] = useState([]);
    const [managers, setManagers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [msg, setMsg] = useState('');
    const [dates, setDates] = useState(null);
    const [taskDetails,setTaskDetails] = useState('');

    const [project, setProject] = useState('');
    const [details, setDetails] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [managerId, setManagerId] = useState('');
    const [employee,setEmployee] = useState({});
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = () => {
        axios.get('http://localhost:8081/api/project/allproject', {
            headers: { 'Authorization': 'Basic ' + localStorage.getItem('token') }
        }).then(resp => {
            setProjects(resp.data);
            setLoading(false);
        }).catch(error => {
            setMsg('Failed to load projects. Please contact IT Admin');
            setLoading(false);
        });

        axios.get('http://localhost:8081/api/manager/all', {
            headers: { 'Authorization': 'Basic ' + localStorage.getItem('token') }
        }).then(resp => {
            setManagers(resp.data);
        }).catch(error => {
            setMsg('Failed to load managers. Please contact IT Admin');
        });

        axios.get('http://localhost:8081/api/employee/getall', {
            headers: { 'Authorization': 'Basic ' + localStorage.getItem('token') }
        }).then(resp => {
            setEmployees(resp.data);
        }).catch(error => {
            setMsg('Failed to load employees. Please contact IT Admin');
        });
    };

    const handleFormSubmit = async() => {
        const data = {
            title: project,
            details: details,
        };
        console.log(data);

        const resp = await axios.post(`http://localhost:8081/api/project/add/${employeeId}/${managerId}`, { // Assuming endpoint for employees
            title:project

            },{
                headers: { 'Authorization': 'Basic ' + localStorage.getItem('token') }
            })

    //     const apiEndpoint = isEdit
    //         ? `http://localhost:8081/api/project/edit/${selectedProjectId}`
    //         : 'http://localhost:8081/api/project/add';

    //     const httpMethod = isEdit ? axios.put : axios.post;

    //     httpMethod(apiEndpoint, data, {
    //         headers: { 'Authorization': 'Basic ' + localStorage.getItem('token') }
    //     }).then(resp => {
    //         setMsg(isEdit ? 'Project Updated Successfully.' : 'Project Added Successfully.');
    //         fetchInitialData();
    //         resetForm();
    //         setVisible(false);
    //     }).catch(err => {
    //         setMsg('Project Save Failed.. please contact IT Admin');
    //     });
         };

    const handleDeleteProject = (id) => {
        axios.delete(`http://localhost:8081/api/project/delete/${id}`, {
            headers: { 'Authorization': 'Basic ' + localStorage.getItem('token') }
        }).then(resp => {
            setMsg('Project Deleted Successfully.');
            fetchInitialData();
        }).catch(err => {
            setMsg('Project Deletion Failed.. please contact IT Admin');
        });
    };

    const resetForm = () => {
        setProject('');
        setDetails('');
        setEmployeeId('');
        setProjectId('');
        setManagerId('');
        setIsEdit(false);
        setSelectedProjectId(null);
    };

    const loadProjectData = (project) => {
        setProject(project.title);
        setDetails(project.details);
        setEmployeeId(project.employeeId);
        setManagerId(project.managerId);
        setSelectedProjectId(project.id);
        setIsEdit(true);
        setVisible(true);
    };

    const assignTask = ()=>{
        console.log(taskDetails)
        console.log(dates)
        let startDate = new Date(dates[0]).toISOString().split("T")[0];
        let endDate = new Date(dates[1]).toISOString().split("T")[0];
        let empId = employee.id; 
        let data = {
            'taskDetails': taskDetails,
            'startDate': startDate,
            'endDate': endDate  
        }
    }
    const header = <div className="table-header">Project Management</div>;

    // const actionBodyTemplate = (rowData) => (
    //     <div>
    //         <Button
    //             type="button"
    //             icon="pi pi-pencil"
    //             className="p-button-rounded p-button-success mr-2"
    //             onClick={() => loadProjectData(rowData)}
    //         />
    //         <Button
    //             type="button"
    //             icon="pi pi-trash"
    //             className="p-button-rounded p-button-danger"
    //             onClick={() => handleDeleteProject(rowData.id)}
    //         />
    //     </div>
    // );

    const findManagerName = (managerId) => {
        const manager = managers.find(manager => manager.id === managerId);
        return manager ? manager.name : 'Unknown';
    };

    const findEmployeeName = (employeeId) => {
        const employee = employees.find(employee => employee.id === employeeId);
        return employee ? employee.name : 'Unknown';
    };

    return (
        <div>
            <Navbar />
            {msg && <div className="alert alert-success">{msg}</div>}
            <div>
                <Button
                    label="Add Project"
                    icon="pi pi-plus"
                    size='large'
                    onClick={() => {
                        resetForm();
                        setVisible(true);
                    }}
                    className='addBtn-btn ml-0'
                />
                <Dialog header={isEdit ? "Edit Project" : "Add Project"} visible={visible} style={{ width: '50vw' }} onHide={() => {
                    resetForm();
                    setVisible(false);
                }}>
                    <div className="mt-3 mb-2">
                        <div className="mb-3">
                            <label className="form-label">Project Name: </label>
                            <input type="text" className="form-control" placeholder="Enter project name"
                                value={project}
                                onChange={(e) => setProject(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Project Details: </label>
                            <input type="text" className="form-control" placeholder="Enter project details"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)} />
                        </div>
                        {/* <div className="mb-3">
                            <label className="form-label">Select Project: </label>
                            <select className="form-select" aria-label="Default select example"
                                value={projectId}
                                onChange={(e) => setProjectId(e.target.value)}>
                                <option value="">Select a project</option>
                                {
                                    projects.map((p, index) => (
                                        <option value={p.id} key={index}>{p.title}</option>
                                    ))
                                }
                            </select>
                        </div> */}
                        <div className="mb-3">
                            <label className="form-label">Select Employee: </label>
                            <select className="form-select" aria-label="Default select example"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}>
                                <option value="">Select an employee</option>
                                {
                                    employees.map((e, index) => (
                                        <option value={e.id} key={index}>{e.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Select Manager: </label>
                            <select className="form-select" aria-label="Default select example"
                                value={managerId}
                                onChange={(e) => setManagerId(e.target.value)}>
                                <option value="">Select a manager</option>
                                {
                                    managers.map((m, index) => (
                                        <option value={m.id} key={index}>{m.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                        <label>Enter Start and end date for the task: </label>
                        
                            <div className= "custom-left">
                            <Calendar
                                value={dates}
                                onChange={(e) => setDates(e.value)}
                                selectionMode="range"
                                readOnlyInput
                                hideOnRangeSelection
                            />
                            </div>
                        </div>
                        {/* <Button label="Submit" icon="pi pi-check" onClick={handleFormSubmit} /> */}
                        <Button label="Submit" icon="pi pi-check" className="addbtn btn-danger" onClick={handleFormSubmit} />
                            <Button label="Cancel" icon="pi pi-times" size='small' onClick={() => {
                                resetForm();
                                setVisible(false);
                            }} className='btn btn-secondary ml-2' />
                    </div>
                </Dialog>
            </div>

            <div className="card">
                <DataTable
                    value={projects}
                    rows={10}
                    tableStyle={{ minWidth: '50rem' }}
                    dataKey="id"
                    loading={loading}
                    header={header}
                    emptyMessage="No projects found."
                >
                    <Column field="id" header="Project ID" style={{ minWidth: "15%" }} />
                    <Column
                        field="title"
                        header="Project Name"
                        sortable style={{ minWidth: "20%" }}
                    />
                    {/* <Column
                        field="duration"
                        header="Project Duration"
                        sortable style={{ minWidth: "25%" }}
                    /> */}
                    <Column
                        field="managerId"
                        header="Project Manager"
                        body={(rowData) => (rowData?.manager.name)}
                        sortable style={{ minWidth: "20%" }}
                    />
                    <Column
                        field="employeeId"
                        header="Employee"
                        body={(rowData) => (rowData?.employee.name)}
                        sortable style={{ minWidth: "20%" }}
                    />
                    {/* <Column header="Action" body={actionBodyTemplate} /> */}
                </DataTable>
            </div>
        </div>
    );
}

export default Projects;











