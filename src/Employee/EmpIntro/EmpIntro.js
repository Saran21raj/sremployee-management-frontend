import Header from "../Header/Header";
//<a href="https://iconscout.com/icons/user-circle-plus" target="_blank">User Circle Plus Icon</a> on <a href="https://iconscout.com">IconScout</a>
import leave from "./leave.svg";
import attendance from "./attendance.svg";
import passwordImg from "./password.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function EmployeeIntro(){

    const empname=localStorage.getItem("name");
    useEffect(()=>{
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
        window.history.pushState(null, document.title, window.location.href);
  },[]);
    })
    return(
        <>
        <Header/>
        <div className="adminIntro-outer-container">
            <h1 className="adminIntro-label">Welcome {empname}</h1>
            <div className="adminIntro-inner-container">
                <div className="adminIntro-option">
                    <Link to="/employee/resetpassword" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={passwordImg} alt="leave-image" className="employee-image"/>
                            <p className="admin-intro-header" >Reset Password</p>
                        </div>
                    </Link>
                </div>
                <div className="adminIntro-option">
                    <Link to="/employee/attendance" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={attendance} alt="attendance" className="employee-image"/>
                            <p className="admin-intro-header">Attendance</p>
                        </div>
                    </Link>
                </div>
                <div className="adminIntro-option">
                    <Link to="/employee/leaverequest" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={leave} alt="leave-image" className="employee-image"/>
                            <p className="admin-intro-header">New Leave Request</p>
                        </div>
                    </Link>
                </div>
                <div className="adminIntro-option">
                    <Link to="/employee/oldleaverequests" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={leave} alt="leave-image" className="employee-image"/>
                            <p className="admin-intro-header">Old Leave Requests</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default EmployeeIntro