import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../employee.css'

function EmployeeBoard () {

    const [data, setData] = useState([]);
    useEffect(() => {

        const getProject = async () => {
          try {
            const resp = await axios.get(`http://localhost:8081/api/employee/getallproject/${localStorage.getItem("id")}`, {
              headers: {
                'Authorization': 'Basic ' + localStorage.getItem("token"),
              },
            });
            setData(resp.data);
            console.log(resp.data)
          } catch (error) {
            console.error("Failed to fetch managers:", error);
          }
        };
       
        getProject();
      }, []);

    return (
        <div>
          <div className='employee-title'>
          <h1>Employee Dashboard</h1>
          </div>
        <div className="card">
            <DataTable value={data}>
                <Column field="id" header="Project ID" sortable style={{ minWidth: "25%" }}></Column>
                <Column field="title" header="Title" sortable style={{ minWidth: "25%" }}></Column>
                <Column field="manager.name" header="Manager" sortable style={{ minWidth: "25%" }}></Column>
                <Column field="employee.name" header="Employee Name"></Column>
            </DataTable>
        </div>
    
        </div>
    );
}
export default EmployeeBoard;