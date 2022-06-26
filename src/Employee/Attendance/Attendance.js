import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Attendance.css";

function EmployeeAttendance(){
    const token=localStorage.getItem("employeetoken");
    const [details,setDetails]=useState({
        empId:"",
        loginTime:"",
        logoutTime:""
    });
    const [label,setLabel]=useState(true);
    const [arr,setArr]=useState([]);
    const [fillDetails,setFillDetails]=useState(true);
    const attendanceListUrl=process.env.REACT_APP_EMPLOYEE_ATTENDANCE_LIST;
    const attendanceUrl=process.env.REACT_APP_EMPLOYEE_ATTENDANCE;
    const [alUpdated,setAlUpdated]=useState(true);
    const [updated,setUpdated]=useState(true);
    details.empId=localStorage.getItem("empId");
    const empname=localStorage.getItem("name")
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;
    // setDetails({date:today})
    const handleChange=({target:{name,value}})=>{
        setAlUpdated(true);
        setUpdated(true);
        setFillDetails(true);
        setDetails(prevState=>({...prevState,[name]:value}));
    }
        useEffect(()=>{
            axios.post(attendanceListUrl,{
                empId:details.empId
            },{
                headers:{
                    "auth-token": token
                }
            }).then((response)=>{
                setArr(response.data);
            })
         },[])
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(details.loginTime!=='' && details.logoutTime!==''){
            axios.post(attendanceUrl,{
                empId:details.empId,
                loginTime:details.loginTime,
                logoutTime:details.logoutTime,
                date:date
            },{
                headers:{
                    "auth-token": token
                }
            }).then((response)=>{
                if(response.status==200){
                    setUpdated(false);
                    window.location.reload();
                }
                if(response.data.length===0){
                    setLabel(false);
                }
                
            }).catch((err)=>{
                if(err.response.status==400){
                    setAlUpdated(false);
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
        <div className="emp-att-outer-container">
            <h1 className="emp-att-main-label">Attendance Entry</h1>
            <h1 className="adminIntro-label">Welcome {empname}</h1>
            <div className="emp-att-inner-container1">
                <div className="emp-att-date">
                    <h4>Date:</h4>
                    <h4>{date}</h4>
                </div>
                <div className="emp-att-date">
                    <h4>LoginTime:</h4>
                    <input type="time" className="emp-att-time" value={details.loginTime} onChange={handleChange} name="loginTime"/>
                </div>
                <div className="emp-att-date">
                    <h4>LogoutTime:</h4>
                    <input type="time" className="emp-att-time" value={details.logoutTime}  onChange={handleChange} name="logoutTime"/>
                </div>
                <button onClick={handleSubmit} className="emp-att-but">Submit</button>
                <h4 className="emp-att-fill-label" disabled={fillDetails}>Fill Details</h4>
                <h4 className="emp-att-suc-label" disabled={updated}>Updated</h4>
            </div>
            <div className="emp-att-inner-container2">
                <table className="emp-att-list">
                    <tr>
                        <th>Date</th>
                        <th>EmpId</th>
                        <th>Login Time</th>
                        <th>Logout Time</th>
                    </tr>
                    {arr.map((details)=>{
                        return(
                            <tr>
                                <td>{details.date}</td>
                                <td>{details.empId}</td>
                                <td>{details.loginTime}</td>
                                <td>{details.logoutTime}</td>
                            </tr>
                        )
                    })}
                </table>
                <h4 className="emp-att-err-label" disabled={alUpdated}>Already Updated</h4>
                <h4 disabled={label} >No Records Found</h4>
            </div>
        </div>
        </>
    )
}


export default EmployeeAttendance;