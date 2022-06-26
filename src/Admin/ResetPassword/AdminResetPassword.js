import { useState } from "react";
import Header from "../Header/Header";
import "./ResetPassword.css";
import Axios from "axios";
function AdminResetPassword(){
    const adminname=localStorage.getItem("name");
    const [password,setPassword]=useState({
        newPassword:"",
        confirmPassword:""
    });
    const token=localStorage.getItem("admintoken");
    const [success,setSuccess]=useState(true);
    const [misMatchErr,setMisMatchErr]=useState(true);
    const resetPasswordUrl=process.env.REACT_APP_ADMIN_RESET_PASSWORD;
    const userName=localStorage.getItem("userName");
    const handleChange=({target:{name,value}})=>{
        setSuccess(true);
        setMisMatchErr(true);
        setPassword(prevState=>({...prevState,[name]:value}));
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(password.newPassword===password.confirmPassword){
            Axios.post(resetPasswordUrl,{
                userName,
                newPassword:password.confirmPassword},{
                    headers:{
                        "auth-token": token
                    }
                }).then((response)=>{
                 if(response.status===200){
                    setSuccess(false);
                 }
                }).catch((err)=>{
                    console.log(err);
            })
        }
        else{
            setMisMatchErr(false);
        }
    }
    return(
        <>
        <Header/>
        <h1 className="emp-reset-label">Welcome {adminname}</h1>
        <div className="emp-resetpass-outer-container">
            <p className="password-label">Reset Password</p>
            <div className="emp-resetpass-pass-container">
                <p className="password-label">New password </p>
                <input 
                    name="newPassword"
                    type="password"
                    placeholder='Password'
                    value={password.newPassword}
                    className='emp-resetpass-editbox'
                    onChange={handleChange}/>
                    <p className="emp-resetpass-mis" disabled={misMatchErr}>Password Mismatch</p>
            </div>
            <div className="emp-resetpass-pass-container">
                <p className="password-label">Confirm password </p>
                <input 
                    name="confirmPassword"
                    type="text"
                    placeholder='Password'
                    value={password.confirmPassword}
                    className='emp-resetpass-editbox'
                    onChange={handleChange}/>
                <button className="emp-resetpass-submit-btn" onClick={handleSubmit}>Submit</button>
                <p className="emp-resetpass-succ" disabled={success}>Password Updated</p>
            </div>
        </div>
        </>
    )
}

export default AdminResetPassword