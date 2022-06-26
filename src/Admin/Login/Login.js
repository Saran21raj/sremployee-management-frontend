import {useState} from 'react';
import Axios from 'axios';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin(){
    const [adminLoginValues,setAdminLoginValues]=useState({
        userName:'test2@123',
        password:'test'
    });
    const loginUrl=process.env.REACT_APP_ADMIN_LOGIN;
    const navigate=useNavigate();
    const [misMatchErr,setMisMatchErr]=useState(true);
    const handleChange=({target:{name,value}})=>{
        setMisMatchErr(true);
        setAdminLoginValues(prevState=>({...prevState,[name]:value}))
    }
    const handleSubmit =(event)=>{
        event.preventDefault();
            // Axios request to Login into the user Account
            Axios.post(loginUrl,{
                userName:adminLoginValues.userName,
                password:adminLoginValues.password}).then((response)=>{
                    const adminToken=response.data.token;
                    const userName=response.data.userName;
                    const name=response.data.name;
                    localStorage.setItem('name',name);
                    localStorage.setItem('admintoken',adminToken);
                    localStorage.setItem("userName",userName);
                    setAdminLoginValues({userName:"",password:""});
                    if(response.status===200){
                        navigate("/admin/intro");
                    }
                }).catch((err)=>{
                    if(err.response.status===403){
                        setMisMatchErr(false);
                    }
            })
    };
    return(
        <>
        <div className='loginOuterContainer'>
            <div className='loginInnerContainer'>
                <h1 className='login-label'>Admin Login</h1>
                    <h4 className='login-label'>Username</h4>
                        <input 
                            name="userName"
                            type="text"
                            placeholder='Username'
                            value={adminLoginValues.userName}
                            className='login-editbox'
                            onChange={handleChange}/>
                        <h4 className='login-label'>Password</h4>
                        <input 
                            name="password"
                            type="password"
                            value={adminLoginValues.password}
                            className='login-editbox'
                            placeholder='Password'
                            onChange={handleChange}/>
                        <button className='login-button' onClick={handleSubmit}>Login</button>
                        <h4 className='login-label-err'disabled={misMatchErr}>Username & Password Doesn't Match</h4>
                        <Link to="/employee/login"> <h4 className='employee-login-label'>Employee Login</h4></Link>
            </div>
        </div>
        </>
    )
}


export default AdminLogin;