import Header from "../Header/Header";
 import "./AdminIntro.css";
import leave from "./leave.svg";
import passwordimg from "./password.svg";
import { useEffect } from "react";
import attendance from "./attendance.svg";
import accountCreation from "./account.svg";
import { Link } from "react-router-dom";
function AdminIntro(){
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
            <div className="adminIntro-inner-container">
                <div className="adminIntro-option">
                    <Link to="/admin/accountcreationintro" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={accountCreation} alt="account-creation" className="employee-image"/>
                            <p className="admin-intro-header">Account Creation</p>
                        </div>
                    </Link>
                </div>
                <div className="adminIntro-option">
                    <Link to="/admin/resetpassword" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={passwordimg} alt="account-creation" className="employee-image"/>
                            <p className="admin-intro-header">Reset Password</p>
                        </div>
                    </Link>
                </div>
                <div className="adminIntro-option">
                    <Link to="/admin/attendancecheck" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={attendance} alt="attendance" className="employee-image"/>
                            <p className="admin-intro-header">Employee Attendance</p>
                        </div>
                    </Link>
                </div>
                <div className="adminIntro-option">
                    <Link to="/admin/leavelist" className="admin-intro-label">
                        <div className="options-outer-container">
                            <img src={leave} alt="leave-image" className="employee-image"/>
                            <p className="admin-intro-header">Employee Leave Request</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
 
        </>
    )
}


export default AdminIntro