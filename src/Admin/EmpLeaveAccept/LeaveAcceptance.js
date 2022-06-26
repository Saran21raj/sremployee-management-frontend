import axios from "axios";
import { useEffect, useState } from "react";
import LeaveStatus from "./LeaveStatus/LeaveStatus";
import Header from "../Header/Header";
import "./LeaveAcceptance.css";
function LeaveAcceptance(){
    const token=localStorage.getItem("admintoken");
    const leaveAcceptanceUrl=process.env.REACT_APP_ADMIN_LEAVE_ACCEPTANCE;
    const [arr,setarr]=useState([]);
    const [load,setLoad]=useState(true);
    useEffect(()=>{
       axios.get(leaveAcceptanceUrl,{
        headers: {
        "auth-token": token
    }
    }).then((response)=>{
           setarr(response.data)
           if(response.data.length==0){
               setLoad(false);
           }
       })
    },[])
    return(
        <>
        <Header/>
        <h1 className="att-check-label">Leave Requests</h1>
        <div className="outerbox">
                {arr.map((list)=>(<LeaveStatus list={list}/>))}
                <h1 disabled={load}>No Records Found</h1>
        </div>
        </>
    )
}

export default LeaveAcceptance;