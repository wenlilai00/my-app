// import Navbar from "./features/hr/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../HR.css'
import { Chart } from 'primereact/chart';
import Table from 'react-bootstrap/Table';
import { Calendar } from 'primereact/calendar';


function Dashboard() {

    const [countEmployee,setCountEmployee] = useState(0);
    const [countManager,setCountManager] = useState(0);
    const [countHR,setCountHR] = useState(0);

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

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
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Employee', 'Manager'],
            datasets: [ 
                {
                    data: [countEmployee, countManager, countHR],
                    backgroundColor: [
                        // documentStyle.getPropertyValue('#df8c43'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        // documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartData(data);
    }, [countEmployee, countManager]);

    useEffect(()=>{
        let token = localStorage.getItem('token'); 
        axios.get('http://localhost:8081/api/hr/stat',{
            headers: {
                'Authorization': 'Basic ' + token
            }
        })
        .then(response=>{
            console.log(response.data)
            setCountEmployee(response.data.count_emoplyee)
            setCountManager(response.data.count_manager)
        })
        .catch(error=>{

        })
    },[])

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

    const [date, setDate] = useState(null);

    return (
        <div>

            <div className="dashboard-container">
                <Container className='container-container'>
                    <h1>HR Dashboard</h1>
                    <Row>
                        <Col className='row-container' xs={12} sm={7}>

                        <div className="chart-container card flex justify-content-left">
                            <Chart 
                            type="doughnut" 
                            data={chartData} 
                            options={chartOptions} 
                            height="300px" 
                            width="400px"
                            className="w-small md:w-1rem" 
                           
                            />

                            <div className="display-manager-employee">
                                <h3>Total Employees: {countEmployee}</h3> 
                                <br />
                                <h3>Total Managers: {countManager}</h3>
                            </div>

                        </div>
                           
                        </Col>

                        <Col sm={5}>
                            <div className="card flex justify-content-center">
                             <Calendar 
                                value={date} 
                                onChange={(e) => setDate(e.value)} 
                                inline 
                                showWeek 
                                className="custom-calendar"
                            />
                            </div>
                        </Col>
                    </Row>
                
                </Container>
            </div>
        </div>
    )
}
export default Dashboard;