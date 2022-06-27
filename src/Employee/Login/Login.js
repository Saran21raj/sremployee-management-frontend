import {useState} from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../loader/Loader';


function EmployeeLogin(){
    const [employeeLoginValues,setEmployeeLoginValues]=useState({
        userName:'',
        password:''
    })
    const loginUrl=process.env.REACT_APP_EMPLOYEE_LOGIN;
    const navigate=useNavigate();
    const [testValue,setTestValue]=useState(true);
    const [misMatchErr,setMisMatchErr]=useState(true);
    const [loginErr,setLoginErr]=useState("Username & Password Doesn't Match")
    const [isLoading,setIsLoading]=useState(true);
    const handleChange=({target:{name,value}})=>{
        setMisMatchErr(true);
        setEmployeeLoginValues(prevState=>({...prevState,[name]:value}))
    }
    const handleSubmit =(event)=>{
        if(employeeLoginValues.userName!==''&& employeeLoginValues.password!=='')
        {
        setIsLoading(true);
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
                        <div className='loader-login' disabled={isLoading}>
                            <Loader/>
                        </div>
                        <h4 className='login-label-err'disabled={misMatchErr}>{loginErr}</h4>
                        <Link to="/admin/login"> <h4 className='employee-login-label'>Admin Login</h4></Link>
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


export default EmployeeLogin