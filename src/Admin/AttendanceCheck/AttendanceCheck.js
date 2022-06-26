import { useState } from "react"

import axios from "axios";
import Header from "../Header/Header";
import "./AttendanceCheck.css";
function AttendanceCheck(){
    const token=localStorage.getItem("admintoken");
    const attendanceCheckUrl=process.env.REACT_APP_ADMIN_ATTENDANCE_CHECK;
    const [details,setDetails]=useState({
        date:"",
        arr:[]
    });
    const [label,setLabel]=useState(true);
    const handleChange=({target:{name,value}})=>{
        setLabel(true);
        setDetails(prevState=>({...prevState,[name]:value}));
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post(attendanceCheckUrl,{
            date:details.date
        },{
            headers: {
            "auth-token": token
        }
        }).then((response)=>{
            setDetails(prevState=>({...prevState,arr:response.data}));
            if(response.data.length===0){
                setLabel(false);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(
        <>
        <Header/>
            <div className="att-check-outer-container">
                <h1 className="att-check-label">AttendanceCheck</h1>
                <div className="att-check-inner-container1">
                    <h4>Date:</h4>
                    <input type="date" value={details.date} className="att-check-date" onChange={handleChange} placeholder="mm/dd/yyyy"name="date"/>
                    <button onClick={handleSubmit} className="att-check-button">Submit</button>
                </div>
                <div className="att-check-inner-container2">
                    <table>
                        <tr>
                            <th>Date (yyyy-mm-dd)</th>
                            <th>EmpId</th>
                            <th>Login Time</th>
                            <th>Logout Time</th>
                        </tr>
                        {details.arr.map((details)=>{
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
                    <h1 disabled={label} >No Records Found</h1>
                </div>
            </div>
        </>
    )
}

export default AttendanceCheck;