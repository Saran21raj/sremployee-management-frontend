
import {useState,useEffect} from 'react';
import Axios from 'axios';
import Header from '../../Header/Header';
import "./AccountCreation.css";

function EmpAccountCreation(){
    const token=localStorage.getItem("admintoken");
    const [empValues,setEmpValues]=useState({
        name:'',
        userName:'',
        password:''
    });
    const accountListUrl=process.env.REACT_APP_ADMIN_EMPLOYEE_ACCOUNT_LIST;
    const accountCreationUrl=process.env.REACT_APP_ADMIN_EMPLOYEE_ACCOUNT_CREATION;
    const [arr,setarr]=useState([]);
    const [load,setLoad]=useState(true);
    const handleChange=({target:{name,value}})=>{
        setEmpValues(prevState=>({...prevState,[name]:value}))
    }
    useEffect(()=>{
        Axios.get(accountListUrl,{
            headers: {
            "auth-token": token
        }
        }).then((response)=>{
            setarr(response.data);
            if(response.data.length==0){
                setLoad(false);
            }
        })
     },[])
    const handleSubmit =(event)=>{
        event.preventDefault();
            //Axios request to Login into the user Account
            if(empValues.name!=='' && empValues.userName!==''&& empValues.password!=='')
            {
                Axios.post(accountCreationUrl,{
                name:empValues.name,
                userName:empValues.userName,
                password:empValues.password}).then((response)=>{
                    setEmpValues({name:"",userName:"",password:""})
                    window.location.reload();
                }).catch((err)=>{
                    if(err.response.status===403){
                        console.log("error");
                    }
            })
            }
            else{
                alert("Please Update Details");
            }
            
    };
    return(
    <>
        <Header/>
        <div className='admin-account-creation-outer-container'>
            <div className='admin-account-creation-inner-container1'>
                <h4 className='admin-account-creation-label'>Name :</h4>
                <input 
                    name="name"
                    type="text"
                    placeholder='Name'
                    value={empValues.name}
                    className='admin-account-creation-editbox'
                    onChange={handleChange}/>
                <h4 className='admin-account-creation-label'>Username :</h4>
                <input 
                    name="userName"
                    type="text"
                    placeholder='Username'
                    value={empValues.userName}
                    className='admin-account-creation-editbox'
                    onChange={handleChange}/>
                <h4 className='admin-account-creation-label'>Password :</h4>
                <input 
                    name="password"
                    type="password"
                    value={empValues.password}
                    className='admin-account-creation-editbox'
                    placeholder='Password'
                    onChange={handleChange}/>
                <button className='admin-account-creation-button' onClick={handleSubmit}>Create Account</button>
            </div>
            <p className='admin-records'>Employee Records</p>
            <div className='admin-account-creation-inner-container2'>
                <table className="accountCreation-table" >
                    <tr className="leaveStatus-table-row">
                        <th className="leaveStatus-table-header">Name</th>
                        <th className="leaveStatus-table-header">Username</th>
                        <th className="leaveStatus-table-header">EmpId</th>
                    </tr>
                    {arr.map((list)=>(
                        <tr className="leaveStatus-table-row">
                            <td className="leaveStatus-table-data"> {list.name} </td>
                            <td className="leaveStatus-table-data"> {list.username} </td>
                            <td className="leaveStatus-table-data"> {list.empId} </td>
                        </tr>
                    ))}
                </table>
                <p className='admin-records' disabled={load}>No Records Found</p>

            </div>
        </div>
    </>
    )
}

export default EmpAccountCreation;