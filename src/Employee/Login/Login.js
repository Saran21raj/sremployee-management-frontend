import {useState} from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function EmployeeLogin(){
    const [employeeLoginValues,setEmployeeLoginValues]=useState({
        userName:'',
        password:''
    })
    const loginUrl=process.env.REACT_APP_EMPLOYEE_LOGIN;
    const navigate=useNavigate();
    const [misMatchErr,setMisMatchErr]=useState(true);
    const handleChange=({target:{name,value}})=>{
        setMisMatchErr(true);
        setEmployeeLoginValues(prevState=>({...prevState,[name]:value}))
    }
    const handleSubmit =(event)=>{
        event.preventDefault();
            //Axios request to Login into the user Account
            Axios.post(loginUrl,{
                userName:employeeLoginValues.userName,
                password:employeeLoginValues.password}).then((response)=>{
                    const employeeToken=response.data.token;
                    const empId=response.data.empId;
                    const empname=response.data.name;
                    localStorage.setItem('employeetoken',employeeToken);
                    localStorage.setItem('empId',empId);
                    localStorage.setItem('name',empname);
                    setEmployeeLoginValues({userName:"",password:""})
                    if(response.status===200){
                        navigate("/employee/intro");
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
                <h1 className='login-label'>Employee Login</h1>
                    <h4 className='login-label'>Username</h4>
                        <input 
                            name="userName"
                            type="text"
                            placeholder='Username'
                            value={employeeLoginValues.userName}
                            className='login-editbox'
                            onChange={handleChange}/>
                        <h4 className='login-label'>Password</h4>
                        <input 
                            name="password"
                            type="password"
                            value={employeeLoginValues.password}
                            className='login-editbox'
                            placeholder='Password'
                            onChange={handleChange}/>
                        <button className='login-button' onClick={handleSubmit}>Login</button>
                        <h4 className='login-label-err'disabled={misMatchErr}>Username & Password Doesn't Match</h4>
                        <Link to="/admin/login"> <h4 className='employee-login-label'>Admin Login</h4></Link>

            </div>
        </div>
        </>
    )
}


export default EmployeeLogin