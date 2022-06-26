import { useState } from "react"
import Axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Header from "../Header/Header";
import "./LeaveRequest.css";
function LeaveRequest(){
    const token=localStorage.getItem("employeetoken");
    const leaveRequestUrl=process.env.REACT_APP_EMPLOYEE_LEAVE_REQUEST;
    const empname=localStorage.getItem("name")
    const [details,setDetails]=useState({
        reason:"",
        date:""
    })
    const [updated,setUpdated]=useState(true);
    const [errUpdating,setErrUpdating]=useState(true);
    const [fillDetails,setFillDetails]=useState(true);
    const handleChange=({target:{name,value}})=>{
        setUpdated(true);
        setErrUpdating(true);
        setFillDetails(true);
        setDetails(prevState=>({...prevState,[name]:value}))
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        const empId=localStorage.getItem("empId");
        if(details.reason!=='' && details.date!==''){
            Axios.post(leaveRequestUrl,{
                reason:details.reason,
                date:details.date,
                empId},{
                    headers:{
                        "auth-token": token
                    }
                }).then((response)=>{
                    if(response.status===200){
                        setUpdated(false);
                    }
                }).catch((err)=>{
                    if(err.response.status===400){
                       console.log("Error");
                       setErrUpdating(false);
                    }
            })
        }
        else{
            setFillDetails(false);
        }
    }
    return(
    <>
        <Header/>
            <div className="emp-nwLeave-outer-container">
                <p className="emp-nwLeave-main-label">Leave Request Page</p>
                <p className="emp-leav-label">Welcome {empname}</p>
                <div className="emp-nwLeave-inner-container1">
                    <div className="emp-nwLeave-date-container">
                        <h4>Date: </h4>
                        <input type="date"  className="emp-nwLeave-date" value={details.date} min={new Date().toISOString().split('T')[0]} name="date" onChange={handleChange} placeholder="mm/dd/yy"/>
                    </div>
                    <div className="emp-nwLeave-err-container">
                        <h4 className="emp-att-fill-label" disabled={fillDetails}>Fill Details</h4>
                        <h4 disabled={updated} className="emp-nwLeave-upt">Updated</h4>
                        <h4 disabled={errUpdating} className="emp-nwLeave-err">Error Updating</h4>
                    </div>
                </div>
                <div className="emp-nwLeave-inner-container2">
                    <h4>Reason: </h4>
                    <textarea value={details.reason} name="reason" onChange={handleChange} rows="10" cols="60" className="emp-nwLeave-reason"/>
                </div>
                <div className="emp-nwLeave-inner-container3">
                    <button onClick={handleSubmit} className="emp-nwLeave-button">Submit</button>
                </div>
            </div>
    </>
    )
}


export default LeaveRequest