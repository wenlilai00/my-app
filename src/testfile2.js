import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext'; 
import { FilterMatchMode } from "primereact/api";
import { Button } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from 'primereact/calendar';
import axios from "axios";

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    const [dates, setDates] = useState(null);
    const [taskDetails, setTaskDetails] = useState('');
    const [msg, setMsg] = useState(null);
    const [assigneeId, setAssigneeId] = useState('');
    const [assigneeType, setAssigneeType] = useState('employee');
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [createProjectVisible, setCreateProjectVisible] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/projects');
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching projects:", error);
            setLoading(false);
        }
    };

    const assignTask = async () => {
        let startDate = new Date(dates[0]).toISOString().split("T")[0];
        let endDate = new Date(dates[1]).toISOString().split("T")[0];
        let projectId = selectedProject.id;
        let data = {
            'taskDetails': taskDetails,
            'startDate': startDate,
            'endDate': endDate,
            'projectId': projectId
        };

        try {
            if (assigneeType === 'employee') {
                await axios.post(`http://localhost:8081/api/task/employee/${assigneeId}`, data);
            } else {
                await axios.post(`http://localhost:8081/api/task/manager/${assigneeId}`, data);
            }
            setMsg(`Task assigned to ${assigneeType === 'employee' ? 'employee' : 'manager'} successfully.`);
        } catch (error) {
            setMsg("Operation Failed, please contact Admin");
        }
    };

    const createProject = async () => {
        try {
            await axios.post('http://localhost:8081/api/projects', newProject);
            setMsg("Project created successfully.");
            fetchProjects();
            setCreateProjectVisible(false);
        } catch (error) {
            setMsg("Error creating project, please contact Admin.");
        }
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText onChange={(e) => globalSearch(e.target.value)} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const globalSearch = (val) => {
        if (val === '')
            fetchProjects();
        else {
            let temp = [...projects.filter(row => row.name.toLowerCase().includes(val.toLowerCase()))];
            setProjects(temp);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <button className="btn btn-warning" onClick={() => {
                    setSelectedProject(rowData)
                    setVisible(true)
                    setMsg(null)
                }}>
                    Assign Task
                </button>
            </div>
        );
    };

    const header = renderHeader();

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">
                Assign task to {selectedProject?.name}
            </span>
            {msg === null ? (
                ""
            ) : (
                <div className="alert alert-warning" role="alert">
                    {msg}
                </div>
            )}
        </div>
    );

    const footerContent = (
        <div>
            <button className="btn btn-warning" onClick={() => assignTask()}> Assign</button>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-danger" onClick={() => { setVisible(false); }}> Cancel</button>
        </div>
    );

    const footerContentCreateProject = (
        <div>
            <button className="btn btn-success" onClick={() => createProject()}> Create Project</button>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-danger" onClick={() => setCreateProjectVisible(false)}> Cancel</button>
        </div>
    );

    return (
        <div className="card">
            <Button onClick={() => setCreateProjectVisible(true)}>Create New Project</Button>
            <DataTable
                value={projects}
                paginator
                rows={10}
                dataKey="id"
                filters={{
                    name: { value: null, matchMode: FilterMatchMode.CUSTOM },
                    city: { value: null, matchMode: FilterMatchMode.EQUALS },
                    salary: { value: null, matchMode: FilterMatchMode.EQUALS }
                }}
                filterDisplay="row"
                loading={loading}
                header={header}
                emptyMessage="No projects found."
            >
                <Column field="id" header="Project ID" style={{ minWidth: "8rem" }} />
                <Column field="name" header="Project Name" style={{ minWidth: "8rem" }} />
                <Column header="Action" body={actionBodyTemplate}></Column>
            </DataTable>

            <Dialog
                visible={visible}
                modal
                header={headerElement}
                footer={footerContent}
                style={{ width: "50rem" }}
                onHide={() => setVisible(false)}
            >
                <p className="m-0">
                    <div>
                        <FloatLabel>
                            <InputTextarea
                                id="description"
                                onChange={(e) => setTaskDetails(e.target.value)}
                                rows={5}
                                cols={88}
                            />
                            <label htmlFor="description">Enter task details</label>
                        </FloatLabel>
                    </div>
                    <label>Enter Start and end date for the task: </label>
                    <br />
                    <div className="card flex justify-content-center">
                        <Calendar
                            value={dates}
                            onChange={(e) => setDates(e.value)}
                            selectionMode="range"
                            readOnlyInput
                            hideOnRangeSelection
                        />
                    </div>
                    <div>
                        <label>Assignee ID:</label>
                        <InputText 
                            value={assigneeId}
                            onChange={(e) => setAssigneeId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Assignee Type:</label>
                        <select value={assigneeType} onChange={(e) => setAssigneeType(e.target.value)}>
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                </p>
            </Dialog>

            <Dialog
                visible={createProjectVisible}
                modal
                header="Create New Project"
                footer={footerContentCreateProject}
                style={{ width: "50rem" }}
                onHide={() => setCreateProjectVisible(false)}
            >
                <div>
                    <label>Project Name:</label>
                    <InputText 
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    />
                </div>
                <div>
                    <label>Project Description:</label>
                    <InputTextarea 
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        rows={5}
                        cols={88}
                    />
                </div>
            </Dialog>
        </div>
    );
}

export default ProjectList;