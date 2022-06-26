import axios from "axios"
import { useEffect, useState } from "react"
import Header from "../../Header/Header";
import "./OldLeaveRequest.css";

function OldLeaveRequest(){
    const token=localStorage.getItem("employeetoken");
    const [arr,setArr]=useState([]);
    const [label,setLabel]=useState(true);
    const empname=localStorage.getItem("name");
    const empId=localStorage.getItem("empId");
    const oldLeaveRequestsUrl=process.env.REACT_APP_EMPLOYEE_OLD_LEAVE_REQUESTS;
    useEffect(()=>{
        axios.post(oldLeaveRequestsUrl,{
            empId:empId
        },{
            headers:{
                "auth-token": token
            }
        }).then((response)=>{
            setArr(response.data);
            if(response.data.length===0){
                setLabel(false);
            }
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return(
        <>
            <Header/>
            <div className="emp-olLeave-outer-container">
                <p className="emp-olLeave-main-label">Old Leave Requests</p>
                <p className="emp-olLeave-label">Welcome {empname}</p>
                <div className="att-check-inner-container2">
                    <table>
                        <tr>
                            <th>Date (yyyy-mm-dd)</th>
                            <th>EmpId</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                        {arr.map((details)=>{
                        return(
                            <tr>
                                <td>{details.date}</td>
                                <td>{details.empId}</td>
                                <td>{details.reason}</td>
                                <td>{details.status}</td>
                            </tr>
                        )
                        })}
                    </table>
                    <p disabled={label}  className="emp-olLeave-rec-no">No Records Found</p>
                </div>
        </div>
        </>
    )
}

export default OldLeaveRequest;