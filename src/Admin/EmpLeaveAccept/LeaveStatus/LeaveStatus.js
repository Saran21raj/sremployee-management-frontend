
import axios from "axios";
import "./LeaveStatus.css";
import { useState } from "react";


function LeaveStatus(props){
    const token=localStorage.getItem("admintoken");
    const leaveStatusUrl=process.env.REACT_APP_ADMIN_LEAVE_STATUS;
    const [done,setDone]=useState(true);
    const handleAccept=(event)=>{
        event.preventDefault();
        axios.post(leaveStatusUrl,{
            status:"accepted",
            empId:props.list.empId,
            reason:props.list.reason,
            date:props.list.date
        },{
            headers: {
            "auth-token": token
        } 
        }).then((response)=>{
                setDone(false);
            }).catch((err)=>{
                console.log(err)
            })
    }
    const handleDecline=(event)=>{
        event.preventDefault();
        axios.post(leaveStatusUrl,{
            status:"declined",
            empId:props.list.empId,
            reason:props.list.reason,
            date:props.list.date
        },{
            headers: {
            "auth-token": token
        }
        }).then((response)=>{
                setDone(false);
            }).catch((err)=>{
                console.log(err);
            })
    }
    return(
    <>
    <div className="leave-status-container">
    <table className="leaveStatus-table">
        <tr className="leaveStatus-table-row">
            <th className="leaveStatus-table-header">Date(yyyy-mm-dd)</th>
            <th className="leaveStatus-table-header">EmpId</th>
            <th className="leaveStatus-table-header">Reason</th>
        </tr>
        <tr className="leaveStatus-table-row">
            <td className="leaveStatus-table-data"> {props.list.date} </td>
            <td className="leaveStatus-table-data"> {props.list.empId} </td>
            <td className="leaveStatus-table-data"> {props.list.reason} </td>
        </tr>
        <tr>
        
            <td><button onClick={handleAccept} className="adm-leave-button">Accept</button></td>
            <td><button onClick={handleDecline} className="adm-leave-button">Decline</button></td>
            <td><h4 disabled={done} className="adm-leave-label">Done</h4></td>
        </tr>
    </table>
    </div>
    </>
    )
}

export default LeaveStatus