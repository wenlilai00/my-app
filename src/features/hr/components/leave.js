import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';

function SendPayslip() {
    const [employeeId, setEmployeeId] = useState('');
    const [payslipData, setPayslipData] = useState({
        month: '',
        year: '',
        grossSalary: '',
        netSalary: '',
        deductions: '',
        otherDetails: ''
    });
    const toast = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPayslipData({ ...payslipData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/payslip/send', { employeeId, payslipData })
            .then(response => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Payslip sent successfully.', life: 3000 });
            })
            .catch(error => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to send payslip.', life: 3000 });
            });
    };

    return (
        <div>
            <Toast ref={toast} />
            <h2>Send Payslip</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        name="employeeId"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Month:</label>
                    <input
                        type="text"
                        name="month"
                        value={payslipData.month}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Year:</label>
                    <input
                        type="text"
                        name="year"
                        value={payslipData.year}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Gross Salary:</label>
                    <input
                        type="number"
                        name="grossSalary"
                        value={payslipData.grossSalary}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Net Salary:</label>
                    <input
                        type="number"
                        name="netSalary"
                        value={payslipData.netSalary}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Other Details:</label>
                    <textarea
                        name="otherDetails"
                        value={payslipData.otherDetails}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Send Payslip</button>
            </form>
        </div>
    );
}

export default SendPayslip;
