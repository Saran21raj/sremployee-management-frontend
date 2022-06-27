import {useState} from 'react';
import Axios from 'axios';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../../loader/Loader";

function AdminLogin(){
    const [adminLoginValues,setAdminLoginValues]=useState({
        userName:'',
        password:''
    });
    const loginUrl=process.env.REACT_APP_ADMIN_LOGIN;
    const navigate=useNavigate();
    const [testValue,setTestValue]=useState(true);
    const [misMatchErr,setMisMatchErr]=useState(true);
    const handleChange=({target:{name,value}})=>{
        setMisMatchErr(true);
        setAdminLoginValues(prevState=>({...prevState,[name]:value}))
    }
    const [loginErr,setLoginErr]=useState("Username & Password Doesn't Match")
    const [isLoading,setIsLoading]=useState(true);
    const handleSubmit =(event)=>{
        if(adminLoginValues.userName!==''&& adminLoginValues.password!=='')
        {
        setIsLoading(true);
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
                    setIsLoading(true);
                    if(err.response.status===400){
                        setLoginErr("User Doesn't Exits");
                        setMisMatchErr(false);
                    }
                    if(err.response.status===403){
                        setLoginErr("Username & Password Doesn't Match");
                        setMisMatchErr(false);
                    }
            })
        }
        else{
            setLoginErr("Please Fill details");
            setMisMatchErr(false);
        }
    };
    const handleTestValues=()=>{
        if(testValue){
            setTestValue(false);
        }
        else{
            setTestValue(true);
        }
    }
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
                        <div className='loader-login' disabled={isLoading}>
                            <Loader/>
                        </div>
                        <h4 className='login-label-err'disabled={misMatchErr}>{loginErr}</h4>
                        <Link to="/employee/login"> <h4 className='employee-login-label'>Employee Login</h4></Link>
                        <div className='login-test-values'>
                            <p className='test-value-heading' onClick={handleTestValues}>Show test values</p>
                            <p className='test-values' disabled={testValue}>Username: test2@123</p>
                            <p className='test-values' disabled={testValue}>Password: test</p>
                        </div>
            </div>
        </div>
        </>
    )
}


export default AdminLogin;