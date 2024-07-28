// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AssignProjectForm = () => {
//   const [managerId, setManagerId] = useState('');
//   const [employeeIds, setEmployeeIds] = useState([]);
//   const [projectId, setProjectId] = useState('');
//   const [managers, setManagers] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8081/api/managers').then(response => setManagers(response.data));
//     axios.get('http://localhost:8081/api/employees').then(response => setEmployees(response.data));
//     axios.get('http://localhost:8081/api/projects').then(response => setProjects(response.data));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       managerId: parseInt(managerId),
//       employeeIds: employeeIds.map(id => parseInt(id)),
//       projectId: parseInt(projectId)
//     };
//     axios.post(`http://localhost:8081/api/hr/project/assign/${managerId}/${projectId}`, employeeIds)
//       .then(response => {
//         console.log('Project assigned:', response.data);
//       })
//       .catch(error => {
//         console.error('Error assigning project:', error.response ? error.response.data : error.message);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <select value={managerId} onChange={e => setManagerId(e.target.value)} required>
//         <option value="">Select Manager</option>
//         {managers.map(manager => (
//           <option key={manager.id} value={manager.id}>{manager.name}</option>
//         ))}
//       </select>
//       <select multiple value={employeeIds} onChange={e => setEmployeeIds([...e.target.selectedOptions].map(o => o.value))} required>
//         {employees.map(employee => (
//           <option key={employee.id} value={employee.id}>{employee.name}</option>
//         ))}
//       </select>
//       <select value={projectId} onChange={e => setProjectId(e.target.value)} required>
//         <option value="">Select Project</option>
//         {projects.map(project => (
//           <option key={project.id} value={project.id}>{project.title}</option>
//         ))}
//       </select>
//       <button type="submit">Assign Project</button>
//     </form>
//   );
// };

// export default AssignProjectForm;
