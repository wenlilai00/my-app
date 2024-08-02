// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addLeaves, deleteLeave, getLeaves } from "../../../store/action/leave";
// import Navbar from "./navbar";
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';

// function LeaveDetails() {
//     const dispatch = useDispatch();
//     const { list } = useSelector((state) => state.leave);
//     const [leaves, setLeaves] = useState([]);
//     const toast = useRef(null);

//     useEffect(() => {
//         dispatch(getLeaves());
//     }, [dispatch]);

//     useEffect(() => {
//         setLeaves(list);
//     }, [list]);

//     const onDeleteLeave = (id) => {
//         dispatch(deleteLeave(id));
//         toast.current.show({ severity: 'warn', summary: 'Deleted', detail: 'Leave deleted', life: 3000 });
//     };

//     const onAddLeave = () => {
//         let newLeave = {
//             reason: "Have to travel",
//             startDate: "2024-08-14",
//             endDate: "2024-08-15",
//             noOfDays: 2
//         };
//         dispatch(addLeaves(newLeave));
//         toast.current.show({ severity: 'success', summary: 'Added', detail: 'Leave added', life: 3000 });
//     };

//     const actionBodyTemplate = (rowData) => {
//         return (
//             <>
//                 <Button label="Archive" icon="pi pi-file" className="p-button-warning p-mr-2" onClick={() => console.log(`Archive: ${rowData.id}`)} />
//                 <Button label="Delete" icon="pi pi-times" className="p-button-danger" onClick={() => onDeleteLeave(rowData.id)} />
//             </>
//         );
//     };

//     return (
//         <div>
//             <Navbar />
//             <Toast ref={toast} />
//             <div className="container">
//                 <div>
//                     <Button label="Add Leave" icon="pi pi-plus" onClick={onAddLeave} />
//                 </div>
//                 <div className="card mt-4">
//                     <DataTable value={leaves} paginator rows={10} className="p-datatable-gridlines">
//                         <Column field="startDate" header="Start Date" sortable></Column>
//                         <Column field="endDate" header="End Date" sortable></Column>
//                         <Column field="status" header="Status" sortable></Column>
//                         <Column field="noOfDays" header="Number of Days" sortable></Column>
//                         <Column field="reason" header="Reason" sortable></Column>
//                         <Column body={actionBodyTemplate} header="Actions"></Column>
//                     </DataTable>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LeaveDetails;

















import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Navbar from "./navbar";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

function LeaveDetails() {
    const { list } = useSelector(state => state.leave);
    const [tasks, setTasks] = useState([...list]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    const [msg, setMsg] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [leaveData, setLeaveData] = useState({
        startDate: '',
        endDate: '',
        reason: '',
        noOfDays: ''
    });
    const toast = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8081/api/task/getall', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => setTasks(resp.data))
        .catch(err => console.error('Error fetching tasks:', err));
    }, []);

    useEffect(() => {
        setTasks(list);
    }, [list]);

    const archiveTask = (tid) => {
        axios.post(`http://localhost:8081/api/task/archive/${tid}`, {}, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setArchivedTasks([...archivedTasks, tid]);
            setMsg('Task Archived');
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Task Archived', life: 3000 });
        })
        .catch(err => {
            setMsg('Operation Failed, Contact admin');
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Operation Failed, Contact admin', life: 3000 });
        });
    };

    const onDeleteLeave = (id) => {
        console.log(`Deleting leave with id: ${id}`);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <button className="btn btn-primary" onClick={() => archiveTask(rowData.id)}>
                    Archive
                </button>
                &nbsp;&nbsp;&nbsp;
                <button className="btn btn-warning" onClick={() => onDeleteLeave(rowData.id)}>Delete</button>
            </>
        );
    };

    const toggleDialogVisibility = () => {
        setIsDialogVisible(!isDialogVisible);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLeaveData({
            ...leaveData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/api/leave/post', leaveData, {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
        .then(resp => {
            setMsg('Leave request submitted successfully.');
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Leave request submitted.', life: 3000 });
            setIsDialogVisible(false);
            setTasks([...tasks, leaveData]); // Add new leave request to the table
            setLeaveData({ startDate: '', endDate: '', reason: '', noOfDays: '' });
        })
        .catch(err => {
            setMsg('Failed to submit leave request.');
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to submit leave request.', life: 3000 });
        });
    };

    return (
        <div>
            <Navbar />
            <Toast ref={toast} />
            <div className="employee-title">
                <h1>Leave Requests</h1>
            </div>

            {msg && <div className="alert alert-success">{msg}</div>}

            <div>
                <Button label="Apply for Leave" className="addLeavebtn" icon="pi pi-plus" onClick={toggleDialogVisibility} />
            </div>

            <Dialog header="Apply for Leave" visible={isDialogVisible} style={{ width: '50vw' }} onHide={toggleDialogVisibility}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={leaveData.startDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="label">End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={leaveData.endDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="label">Number of Days:</label>
                        <input
                            type="number"
                            name="noOfDays"
                            value={leaveData.noOfDays}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="label">Reason:</label>
                        <textarea
                            name="reason"
                            value={leaveData.reason}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <Button type="submit" label="Submit" className="addbtn btn-danger" icon="pi pi-check" />
                    <Button label="Cancel" icon="pi pi-times" size='small' onClick={toggleDialogVisibility} className='btn btn-secondary ml-2' />
                </form>
            </Dialog>

            <div className="card">
                <DataTable value={tasks} className="p-datatable-gridlines">
                    <Column field="startDate" header="Start Date"></Column>
                    <Column field="endDate" header="End Date"></Column>
                    <Column field="status" header="Status"></Column>
                    <Column field="noOfDays" header="Number of Days"></Column>
                    <Column field="reason" header="Reason"></Column>
                    <Column body={actionBodyTemplate} header="Actions"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default LeaveDetails;






// import { useEffect, useState } from "react";
// import Navbar from "./navbar";
//  import { useDispatch, useSelector } from "react-redux";
// import { addLeaves, deleteLeave, getLeaves } from "../../../store/action/leave";
//  function LeaveDetails(){
    
//     const dispatch = useDispatch();
//     const {list} = useSelector((state)=>state.leave);
//     const [leaves,setLeaves] = useState([...list]);
    
//     useEffect(()=>{
//         dispatch(getLeaves())
//     },[dispatch]);

//     const onDeleteLeave =(id)=>{
//         dispatch(deleteLeave(id));

//     }

//     const onAddLeave = ()=>{
//         let leave = {
//             "reason":"Have to travel",
//             "startDate":"2024-08-14",
//             "endDate":"2024-08-15",
//             "noOfDays":2
//         }
//         dispatch(addLeaves(leave));
//     }
//     return (
//         <div>
//             <Navbar />
//             <div className="container">
//                 <div>
//                     <button onClick={()=>onAddLeave()}>Add Leave</button>
//                 </div>
//                 {
//                     leaves.map((l,index)=>(
//                         <div className="row mt-4" key={index}>
//                             <div className="col-lg-12"> 
//                                 <div className="card">
//                                     <div className="card-header">
//                                         <span>Start Date: {l.startDate}</span>
//                                         &nbsp; &nbsp; &nbsp;
//                                         <span>End Date: {l.endDate}</span>
//                                         &nbsp; &nbsp; &nbsp;
//                                         <span>
//                                             Status: {l.status}
//                                         </span>
//                                     </div>
//                                     <div className="card-body">
//                                         <span>Number fo Days Requested: {l.noOfDays}</span>
//                                         <br />
//                                         <p>
//                                             {l.reason}
//                                         </p>
//                                     </div>
//                                     <div className="card-footer">
//                                         <button className="btn btn-warning">Archive</button>
//                                         &nbsp;&nbsp;&nbsp;
//                                         <button className="btn btn-warning" onClick={()=>onDeleteLeave(l.id)}>Delete</button>

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }

// export default LeaveDetails;