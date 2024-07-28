import { useEffect, useState } from "react";

 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
 import { InputText } from 'primereact/inputtext'; 
import { FilterMatchMode } from "primereact/api";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from 'primereact/calendar';
import axios from "axios";

function EmployeeList(){
     const {list} = useSelector((state)=>state.employee)
     const [data,setData] = useState([...list]);
    const [filters,] = useState({
        name: { value: null, matchMode: FilterMatchMode.CUSTOM },
        city: { value: null, matchMode: FilterMatchMode.EQUALS },
        salary: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading,setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [visibleTasks, setVisibleTasks] = useState(false);
    
    const [employee,setEmployee] = useState({});
    const [dates, setDates] = useState(null);
    const [taskDetails,setTaskDetails] = useState('');
    const [msg,setMsg] = useState(null);
    const [tasks,setTasks] = useState([]);

    useEffect(()=>{
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); 

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

        axios.post('http://localhost:8081/api/task/employee/' + empId,
            data,
            {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp=>{
            setMsg("Task Assigned to " + employee.name + " successfully.")
        })
        .catch(err=>{
            setMsg("Operation Failed, pls contack Admin")
        })
    }
    const globalSearch = (val)=>{
        if(val === '')
            setData(list)
        else{
            let temp = [...data
                .filter(row=>row.name.toLowerCase().search(val) !== -1)];
            setData(temp)
        }
         
    }
    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText   onChange={(e)=>globalSearch(e.target.value)} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const showTask = (id)=>{
        axios.get('http://localhost:8081/api/task/' + id,{
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp=>{
            setTasks(resp.data);
        })
    }

    const header = renderHeader();

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <button className="btn btn-info" onClick={()=>{
                    setEmployee(rowData)
                    setVisibleTasks(true);
                    showTask(rowData.id);
                    setMsg(null)
                }}> Show Tasks</button>
                &nbsp;&nbsp;
                <button className="btn btn-warning" onClick={() => {
                    setEmployee(rowData)
                    setVisible(true)
                    setMsg(null)
                    }}> 
                    Assign Task
                    </button>

            </div>
        );
    };

    const cityRowFilter=(value)=>{
        console.log(value)
    }
     

    const headerElement = (
      <div className="inline-flex align-items-center justify-content-center gap-2">
        <span className="font-bold white-space-nowrap">
          Assign task to {employee?.name}
            </span>
            {msg === null ? (
            ""
            ) : (
            <div class="alert alert-warning" role="alert">
                {msg}
            </div>
            )}
      </div>
    );

    const footerContent = (
        <div>
            
             <button className="btn btn-warning " onClick={() => assignTask()}> Assign</button>

            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-danger " onClick={() => {setVisible(false); setVisibleTasks(false)}}> Cancel</button>

        </div>
    );

    const footerContentTask = (
        <div>
            
 
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-danger " onClick={() => {setVisible(false); setVisibleTasks(false)}}> Cancel</button>

        </div>
    );


    const archiveTask=(tid)=>{
        axios.get('http://localhost:8081/api/task/archive/' + tid,{
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp=>{
            setTasks([...tasks.filter(t=>t.id !== tid)]);
            setMsg('Task Archived')
        })
        .catch(err=>{
            setMsg('Operation Failed, Contact admin')
        })
    }
    return (
      <div className="card">
        <DataTable
          value={list}
          paginator
          rows={2}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          loading={loading}
          header={header}
          emptyMessage="No employees found."
        >
          <Column field="id" header="System ID" style={{ minWidth: "8rem" }} />
          <Column
            field="name"
            header="Name"
            filterPlaceholder="Search by name"
            style={{ minWidth: "8rem" }}
          />
          <Column
            field="city"
            header="City"
            style={{ minWidth: "8rem" }}
            filterPlaceholder="Search by City"
            filterElement={cityRowFilter}
          />
          <Column field="salary" header="Salary" style={{ minWidth: "8rem" }} />
          <Column
            field="jobTitle"
            header="Job Title"
            filterField="jobTitle"
            style={{ minWidth: "12rem" }}
            filterPlaceholder="Search by job Title"
          />
          <Column header="Action" body={actionBodyTemplate}>
            {" "}
          </Column>
        </DataTable>

        <Dialog
          visible={visible}
          modal
          header={headerElement}
          footer={footerContent}
          style={{ width: "50rem" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <p className="m-0">
            <div>
              <FloatLabel>
                <InputTextarea
                  id="description"
                  onChange={(e) => {
                    setTaskDetails(e.target.value);
                  }}
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
          </p>
        </Dialog>

        <Dialog
          visible={visibleTasks}
          modal
          header={headerElement}
          footer={footerContentTask}
          style={{ width: "50rem" }}
          onHide={() => {
            if (!visibleTasks) return;
            setVisibleTasks(false);
          }}
        >
          <p className="m-0">
            {tasks.map((t, index) => (
              <div className="row" key={index}>
                <div className="cols-lg-12">
                  <div className="card mt-2">
                    <div className="card-header">
                    <div>Start Date: {t.startDate}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                            End Date: {t.endDate}
                        </div>
                     </div>
                    <div className="card-body">
                        <p style={{fontSize: '1.3em', fontFamily: "monospace" } }>{t.taskDetails}</p>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-danger" onClick={()=>archiveTask(t.id)}>Archive</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </p>
        </Dialog>
      </div>
    );
}

export default EmployeeList;