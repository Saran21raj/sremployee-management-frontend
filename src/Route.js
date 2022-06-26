import {BrowserRouter,Route,Routes} from "react-router-dom"
import EmpAccountCreation from "./Admin/AccountCreation/EmpAccountCreation/EmployeeAccountCreation";
import LeaveAcceptance from "./Admin/EmpLeaveAccept/LeaveAcceptance";
import AdminLogin from "./Admin/Login/Login"
import LeaveRequest from "./Employee/Leaverequest/LeaveRequest";
import EmployeeLogin from "./Employee/Login/Login";
import EmployeeAttendance from "./Employee/Attendance/Attendance";
import AttendanceCheck from "./Admin/AttendanceCheck/AttendanceCheck";
import AdminIntro from "./Admin/AdminIntro/AdminIntro";
import EmployeeIntro from "./Employee/EmpIntro/EmpIntro";
import OldLeaveRequest from "./Employee/Leaverequest/OldLeaveRequest/OldLeaveRequest";
import EmployeeResetPassword from "./Employee/ResetPassword/EmployeeResetPassword";
import AdminAccountCreation from "./Admin/AccountCreation/AdminAccountCreation/AdminAccountCreation";
import AccountCreation from "./Admin/AccountCreation/AccountCreation";
import AdminResetPassword from "./Admin/ResetPassword/AdminResetPassword";
function AdminPrivateRoute({ children }){
    const token=localStorage.getItem("admintoken");
    if(token){
        return children;
    }
    else{
        return <AdminLogin/>
    }
}
function EmployeePrivateRoute({ children }){
    const token=localStorage.getItem("employeetoken");
    if(token){
        return children;
    }
    else{
        return <EmployeeLogin/>
    }
}
function RoutingPage(){

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin/login" element={<AdminLogin/>}/>
                    <Route path="/admin/accountcreationintro"element={<AdminPrivateRoute> <AccountCreation/> </AdminPrivateRoute>}/>
                    <Route path="/admin/intro" element={<AdminPrivateRoute> <AdminIntro/> </AdminPrivateRoute>}/>
                    <Route path="/admin/accountcreation" element={<AdminPrivateRoute> <AdminAccountCreation/> </AdminPrivateRoute>}/>
                    <Route path="/admin/resetpassword" element={<AdminPrivateRoute> <AdminResetPassword/> </AdminPrivateRoute> }/>\
                    <Route path="/admin/empaccountcreation" element={<AdminPrivateRoute> <EmpAccountCreation/> </AdminPrivateRoute> }/>
                    <Route path="/admin/leavelist" element={<AdminPrivateRoute> <LeaveAcceptance/> </AdminPrivateRoute> }/>
                    <Route path="/admin/attendancecheck" element={<AdminPrivateRoute> <AttendanceCheck/> </AdminPrivateRoute> }/>
                    <Route path="/employee/login" element={<EmployeeLogin/>}/>
                    <Route path="/employee/intro" element={<EmployeePrivateRoute> <EmployeeIntro/> </EmployeePrivateRoute>}/>
                    <Route path="/employee/leaverequest" element={<EmployeePrivateRoute> <LeaveRequest/> </EmployeePrivateRoute> }/>
                    <Route path="/employee/oldleaverequests" element={<EmployeePrivateRoute> <OldLeaveRequest/> </EmployeePrivateRoute> }/>
                    <Route path="/employee/attendance" element={<EmployeePrivateRoute> <EmployeeAttendance/> </EmployeePrivateRoute> }/>
                    <Route path="/employee/resetpassword" element={<EmployeePrivateRoute> <EmployeeResetPassword/> </EmployeePrivateRoute> }/>
                    <Route path="*" element={<AdminLogin/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}


export default RoutingPage;